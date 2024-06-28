"use client"
import RestaurentFooter from '@/app/_components/RestaurentFooter'
import Restaurentheader from '@/app/_components/RestaurentHeader'
import React, { useEffect, useState } from 'react'
import './../style.css'
import AddFoodItem from '@/app/_components/AddFoodItem'
import FoodItemList from '@/app/_components/FoodItemList'
import { useRouter } from 'next/navigation'
const page = () => {

  const router = useRouter();

  const [additem, setAdditem] = useState(false);
  return (
    <div className='container'>

      <Restaurentheader />

      <div >
        <button  className='button ' onClick={() => router.push("/restaurant/orders")}> See Orders</button>
      </div>

      <button onClick={() => setAdditem(true)} className='button ' >Add Food</button>
      <button onClick={() => setAdditem(false)} className='button mt'>See Dashboard</button>
      {additem ? <AddFoodItem setAdditem={setAdditem} /> : <FoodItemList />}
      <RestaurentFooter />
    </div>
  )
}

export default page
