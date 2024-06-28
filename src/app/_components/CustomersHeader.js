"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CustomersHeader = (props) => {

    // let userid = "661e860781876cb6a0176314";
    let userid = "";

    const [data, setdata] = useState({
        user_id: userid,
        resto_id: "",
        food_id: "",
    });

    const [cartnumber, setCartNumber] = useState(0);


    useEffect(() => {

        changedata();

    }, [props.cartdata]);

    const changedata = async () => {
        let parsedata = localStorage.getItem("username");
        if(parsedata){
            userid = JSON.parse(parsedata)._id;
        }
        if (props.cartdata) {

            if (!userid) {
                alert("Login is required");
                return;
            }

            setdata({
                user_id: userid,
                resto_id: props.cartdata.resto_id,
                food_id: props.cartdata._id,
            })


            const response = await fetch("http://localhost:3000/api/user/restaurent/food", {
                method: "POST",
                body: JSON.stringify(data)
            })
        }

        if (userid) {
            let result = await fetch("http://localhost:3000/api/user/" + userid);
            const responseData = await result.json();
            setCartNumber(responseData.result.length);
        }

    }

    return (
        <div className='header-wrapper'>
            <div className='logo'>
                <img style={{ width: 100 }} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt="" />
            </div>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/customerorders"}>My Orders</Link>
                </li>
                <li>
                    <Link href={"/user"}>Login/Signup</Link>
                </li>
                <li>
                    <Link href={"/Cartplace"}>Cart({cartnumber})</Link>
                </li>
                <li>
                    <Link href={"/restaurant"}> Add Restaurent</Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomersHeader
