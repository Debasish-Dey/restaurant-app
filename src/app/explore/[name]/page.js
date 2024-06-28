"use client";


import CustomersHeader from '@/app/_components/CustomersHeader';
import RestaurentFooter from '@/app/_components/RestaurentFooter';
import React, { useEffect, useState } from 'react'



const page = (props) => {

  const [restaurentdetails, setRestaurantsdetails] = useState();
  const [foodlist, setfoodlist] = useState([]);
  const [cartdata, setcartdata] = useState();

  const name = props.params.name;
  useEffect(() => {
    loadrestaurentsdetails();
  }, []);

  const loadrestaurentsdetails = async () => {

    const id = props.searchParams.id;

    let response = await fetch("http://localhost:3000/api/customer/" + id);

    response = await response.json();

    if (response.success) {
      setfoodlist(response.food_items);
      setRestaurantsdetails(response.result);
    }
  }

  const addtocart = (item) => {
    setcartdata(item);
  }

  return (
    <div>
      <CustomersHeader cartdata={cartdata} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className='detail-wrapper'>
        <h3>Contact :{restaurentdetails?.contact}</h3>
        <h3>City :{restaurentdetails?.city}</h3>
        <h3>Adress :{restaurentdetails?.address}</h3>
        <h3>Email :{restaurentdetails?.email}</h3>
      </div>
      <div className='fooditemwrapper'>
        {
          foodlist.length > 0 ? foodlist.map((item) => (
            <div className='fooditems' key={item._id}>
              <img style={{ width: 100 }} src={item.img_path} alt="" />
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className='description'>{item.description}</div>
                <button onClick={() => addtocart(item)}>Add To Cart</button>
              </div>
            </div>
          ))
            : <h1>Sorry !! No food items available currently</h1>
        }
      </div>
      <br />
      <br />
      <RestaurentFooter />
    </div>
  )
}

export default page