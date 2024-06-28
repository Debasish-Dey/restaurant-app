"use client"

import React, { useEffect, useState } from 'react'

const Restaurentsorders = () => {
    const [orderdetail, setOrderDetails] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const userDataFromLocalStorage = localStorage.getItem("user");
            const userData = JSON.parse(userDataFromLocalStorage);
            const userIdFromLocalStorage = userData._id;
            const response = await fetch(`http://localhost:3000/api/restaurents/${userIdFromLocalStorage}/orders`);
            const responseData = await response.json();
            setOrderDetails(responseData.result);
        };

        loadOrders();
    }, []);

    console.log(orderdetail);

    return (
        <div>
            {
                orderdetail && orderdetail.map(order => (
                    <div key={order._id}>
                        <button className='button' onClick={()=>{console.log(order.user_id);}}>User Details</button>
                        <br />
                        {
                         order.orderdetails
                         .map(elem=>(
                            
                                <div key={elem._id}>
                                    <div>Item : {elem.menu.name}</div>
                                    <div>Price :{elem.menu.price}</div>
                                    <div>Quantity :{elem.quantity}</div>
                                    <br />
                                </div>
                            ))
                        }
                        <hr />
                    </div>
                   
                ))
            }
        </div>
    );
};

export default Restaurentsorders;
