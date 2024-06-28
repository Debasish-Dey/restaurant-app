"use client";
import React, { useState } from 'react'
import './style.css'
import RestaurentFooter from '../_components/RestaurentFooter';
import Usersignup from '../_components/Usersignup';
import Userlogin from '../_components/Userlogin';
import CustomersHeader from '../_components/CustomersHeader';

const restaurant = () => {

    const [login, setLogin] = useState(1);
    return (
        <div className='container'>
            <CustomersHeader/>
            <h1>User Login / Signup page</h1>
            {
                login ? <Userlogin /> : <Usersignup />
            }
            <div>
                <button className='button-link' onClick={() => setLogin(!login)}>
                    {
                        login ? "Donot have account ? Signup" : "Already have an account ? Login"
                    }
                </button>
            </div>
            <br /> <br />
            <RestaurentFooter/>
        </div>
    )
}

export default restaurant 
