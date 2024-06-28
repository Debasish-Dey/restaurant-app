"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';

const Restaurentheader = () => {

  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    let data = localStorage.getItem("user");
    if (!data && pathname == "/restaurant/dashboard") {
      router.push('/restaurant');
    } else if (data && pathname == "/restaurant") {
      router.push('/restaurant/dashboard');
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout=()=>{
    localStorage.removeItem("user");
    router.push('/restaurant');
  }


  return (
    <div>
      <div className='header-wrapper'>
        <div className='logo'>
          <img style={{ width: 100 }} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt="" />
        </div>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          {
            details && details.name ? <>
              <li>
                <Link href='/'>Profile</Link>
              </li>
              <li>
                <button onClick={logout} >Logout</button>
              </li>
            </> : <li>
              <Link href='/'> Login / Signup </Link>
            </li>
          }


        </ul>

      </div>
    </div>
  )
}

export default Restaurentheader
