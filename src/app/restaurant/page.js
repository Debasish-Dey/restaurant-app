"use client";
import React, { useState } from 'react'
import Restaurentsignup from '../_components/RestaurentSignup'
import Restaurentlogin from '../_components/RestaurentLogin'
import Restaurentheader from '../_components/RestaurentHeader';
import './style.css'
import RestaurentFooter from '../_components/RestaurentFooter';

const restaurant = () => {

    const [login, setLogin] = useState(1);
    return (
        <div className='container'>
            <Restaurentheader/>
            <h1>Restaurent Login / Signup page</h1>
            {
                login ? <Restaurentlogin /> : <Restaurentsignup />
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
