"use client"
import React, { useEffect, useState } from 'react'
import CustomersHeader from '../_components/CustomersHeader';

const page = () => {




  let userid = "";
  let parsedata = localStorage.getItem("username");
  if (parsedata) {
    userid = JSON.parse(parsedata)._id;
  }

  console.log(userid);

  const [orderdetail , setOrderDetails] =useState([]);

  const showorders = async () => {
    console.log(userid);
    if (!userid) return;
    // console.log(id);
    let response = await fetch("http://localhost:3000/api/customer/" + userid + "/orders" );
    response = await response.json();
    setOrderDetails(response.result);
    console.log(response);
  }


  useEffect(() => {
    showorders();
  }, []);




  return (
    
    <div>
      <CustomersHeader/>
            {
                orderdetail && orderdetail.map(order => (
                    <div key={order._id}>
                        <button className='button' onClick={()=>{console.log(order.user_id)}}>Restaurent Details</button>
                        <button className='button' onClick={()=>{console.log(order._id)}} >Cancel order</button>
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
  )
}

export default page
