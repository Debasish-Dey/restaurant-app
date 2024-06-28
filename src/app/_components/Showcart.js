"use client";

import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomersHeader from './CustomersHeader';
import RestaurentFooter from './RestaurentFooter';

const Showcart = () => {

    const [locations, setlocations] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [selectedlocation, setSelectedLocation] = useState("");
    const [showLocation, setShowLocation] = useState(false);

    const router = useRouter();

    useEffect(() => {
        Loadlocation();
        LoadRestaurant();
      }, []);
    
      const Loadlocation = async () => {
        let response = await fetch("http://localhost:3000/api/customer/location");
        response = await response.json();
        if (response.success) {
          setlocations(response.result);
        }
      }

      const LoadRestaurant = async (params) => {
        let url = "http://localhost:3000/api/customer";
        if (params?.location) {
          url = url + "?location=" + params.location;
        } else if (params?.restaurant) {
          url = url + "?restaurant=" + params.restaurant;
        }
        let response = await fetch(url);
        response = await response.json();
        if (response.success) {
          setRestaurants(response.result);
        }
      }
    
    
      const handleListItem = (item) => {
        setSelectedLocation(item)
        setShowLocation(false)
        LoadRestaurant({ location: item })
      }
    
    return (
        <div>
            <main >

                <CustomersHeader />
                <div className="main-page-banner">
                    <h1>My Cart</h1>
                    <div className="input-wrapper">
                        <input value={selectedlocation} className="select-input" type="text" placeholder="Select place" readOnly
                            onClick={() => setShowLocation(true)}
                        />
                        <ul className="location-list">
                            {
                                showLocation && locations.map((item, key) => (
                                    <li key={key} onClick={() => handleListItem(item)}>{item}</li>
                                ))
                            }
                        </ul>
                        <input className="search-input" type="text" placeholder="Search name"
                            onClick={() => setShowLocation(false)}
                            onChange={(event) => LoadRestaurant({ restaurant: event.target.value })}
                        />
                    </div>

                </div>
                <div className="restaurant-list-container">
                    {
                        restaurants.map((item) => (
                            <div key={item._id} className="restaurant-wrapper" onClick={() => router.push("/mycart/"  + "?id=" + item._id)}>
                                <div className="heading-wrapper">
                                    <h3>{item.name}</h3>
                                    <h5>contact : {item.contact}</h5>
                                </div>
                                <div className="address-wrapper">
                                    <div>{item.city} , </div>
                                    <div className="address"> {item.address} , Email: {item.email}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <br />
                <br />
                <RestaurentFooter />
            </main>
        </div>
    )
}

export default Showcart
