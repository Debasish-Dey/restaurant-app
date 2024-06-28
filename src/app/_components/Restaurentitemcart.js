"use client";
import React, { useEffect, useState } from "react";

const Restaurentitemcart = () => {
  const [userid, setUserid] = useState("");
  const [cartitems, setCartitems] = useState([]);
  const [orderdata, setOrderdata] = useState({
    resto_id: "",
    user_id: "",
    orderdetails: [],
  });

  // Get the user ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const parsedata = localStorage.getItem("username");
      if (parsedata) {
        const userIdFromStorage = JSON.parse(parsedata)._id;
        setUserid(userIdFromStorage);
        setOrderdata((prevOrderdata) => ({
          ...prevOrderdata,
          user_id: userIdFromStorage,
        }));
      }
    }
  }, []);

  // Fetch cart items and update order data
  useEffect(() => {
    if (userid) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const id = urlSearchParams.get("id");
      setOrderdata((prevOrderdata) => ({
        ...prevOrderdata,
        resto_id: id,
      }));
      showCart(id);
    }
  }, [userid]);

  const showCart = async (id) => {
    if (!userid) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userid}/restaurent/${id}`
      );
      const data = await response.json();
      setCartitems(data.result);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const saveOrder = () => {
    setOrderdata((prevOrderdata) => ({
      ...prevOrderdata,
      orderdetails: cartitems,
    }));
  };

  useEffect(() => {
    updateOrder();
  }, [orderdata.orderdetails]);

  const updateOrder = async () => {
    if (orderdata.orderdetails.length === 0) return;
    try {
      await fetch("http://localhost:3000/api/restaurents/orders", {
        method: "POST",
        body: JSON.stringify(orderdata),
      });
      cartitems.forEach((element) => {
        deleteItem(element._id);
      });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/user/restaurent/food/${id}`, {
        method: "DELETE",
      });
      const updatedCartResponse = await fetch(
        `http://localhost:3000/api/user/${userid}/restaurent/${orderdata.resto_id}`
      );
      const updatedCartData = await updatedCartResponse.json();
      setCartitems(updatedCartData.result);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const changeItem = async (id, food_id) => {
    const quant = document.querySelector(`.${food_id}`).value;
    if (quant) {
      try {
        await fetch(`http://localhost:3000/api/user/restaurent/food/${id}`, {
          method: "PUT",
          body: JSON.stringify({ quantity: quant }),
        });
        const updatedCartResponse = await fetch(
          `http://localhost:3000/api/user/${userid}/restaurent/${orderdata.resto_id}`
        );
        const updatedCartData = await updatedCartResponse.json();
        setCartitems(updatedCartData.result);
      } catch (error) {
        console.error("Error changing item quantity:", error);
      }
    }
  };

  return (
    <div>
      {cartitems &&
        cartitems.map((item) => (
          <div key={item._id} className="cartmaindiv">
            <img src={item.menu.img_path} alt="" />
            <div>
              <div>Name: {item.menu.name}</div>
              <div>Price: {item.menu.price}</div>
              <div>Description: {item.menu.description}</div>
              <div>
                Quantity:{" "}
                <input
                  className={item.food_id}
                  type="number"
                  placeholder={item.quantity}
                />
              </div>
              <button onClick={() => changeItem(item._id, item.food_id)}>
                Change Quantity
              </button>
              <button onClick={() => deleteItem(item._id)}>
                Delete from cart
              </button>
            </div>
          </div>
        ))}
      <button onClick={saveOrder}>Order now</button>
      <br />
      <br />
    </div>
  );
};

export default Restaurentitemcart;
