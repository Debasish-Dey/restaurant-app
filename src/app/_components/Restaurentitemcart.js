"use client";
import React, { useEffect, useState } from 'react'

const Restaurentitemcart = () => {

    let userid = "";
    let parsedata = localStorage.getItem("username");
    if (parsedata) {
        userid = JSON.parse(parsedata)._id;
    }

    const [cartitems, setcartitems] = useState();

    const [orderdata, setorderdata] = useState({
        resto_id: "",
        user_id: userid,
        orderdetails: [],
    })

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = urlSearchParams.get('id');
        setorderdata({
            ...orderdata,
            resto_id: id
        })
        showcart(id);
    }, []);

    const showcart = async (id) => {
        if(!userid) return;
        console.log(id);
        let response = await fetch("http://localhost:3000/api/user/" + userid + "/restaurent/" + id);
        response = await response.json();
        setcartitems(response.result);
    }

    const saveorder = async () => {
        setorderdata({
            ...orderdata,
            orderdetails: cartitems,
        })
    }

    useEffect(() => {
        updateorder();
    }, [orderdata]);

    const updateorder = async () => {
        if (orderdata.orderdetails.length === 0) return;
        let response = await fetch("http://localhost:3000/api/restaurents/orders", {
            method: "POST",
            body: JSON.stringify(orderdata),
        });

        cartitems.forEach(element => {
            deleteitem(element._id);
        });
    }


    const deleteitem = async (id) => {
        let response = await fetch("http://localhost:3000/api/user/restaurent/food/" + id, {
            method: "DELETE",
        });
        const updatedCartResponse = await fetch("http://localhost:3000/api/user/" + userid + "/restaurent/" + orderdata.resto_id);
        const updatedCartData = await updatedCartResponse.json();
        setcartitems(updatedCartData.result);
    }


    const changeitem = async (id, food_id) => {
        let quant = document.getElementsByClassName(food_id).quantity.value;
        if (quant) {
            let response = await fetch("http://localhost:3000/api/user/restaurent/food/" + id, {
                method: "PUT",
                body: JSON.stringify({
                    quantity: quant
                }),
            });
        }
        const updatedCartResponse = await fetch("http://localhost:3000/api/user/" + userid + "/restaurent/" + orderdata.resto_id);
        const updatedCartData = await updatedCartResponse.json();
        setcartitems(updatedCartData.result);
    }
    return (
        <div>
            {
                cartitems && cartitems.map((item) => (
                    <div key={item._id} className='cartmaindiv'>
                        <img src={item.menu.img_path} alt="" />
                        <div>
                            <div>Name :{item.menu.name}</div>
                            <div>Price :{item.menu.price}</div>
                            <div>Description :{item.menu.description}</div>
                            <div>Quatity : <input className={item.food_id} type="number" name="" id="quantity" placeholder={item.quantity} /> </div>
                            <button onClick={() => changeitem(item._id, item.food_id)}>Change Quantity</button>
                            <button onClick={() => deleteitem(item._id)}>Delete from cart</button>
                        </div>
                    </div>
                ))
            }
            <button onClick={saveorder}>Order now</button>
            <br /> <br />
        </div>


    )
}
export default Restaurentitemcart



