import React, { useState } from 'react'

const AddFoodItem = (props) => {


    const restodata = JSON.parse(localStorage.getItem("user"))
    let x;
    if (restodata) {
        x = restodata._id;
    }

    const [data, setData] = useState({
        name: "",
        price: "",
        img_path: "",
        description: "",
        resto_id: x
    });

    const handleFoodItem = async () => {

        if (data.name == "") {
            alert("Name cant be empty");
            return;
        }
        if (data.price == "") {
            alert("Price cant be empty");
            return;
        }
        if (data.img_path == "") {
            alert("Image path cant be empty");
            return;
        }

        if (data.description == "") {
            alert("description cant be empty");
            return;
        }

        let response = await fetch("http://localhost:3000/api/restaurents/foods", {
            method: "POST",
            body: JSON.stringify(data)
        })

        response = await response.json();
        if (response.success) {
            props.setAdditem(false);
            alert("Food item added successfully");
        } else {
            alert("failed to add food item");
        }
    }
    
    return (
        <div className='container'>
            <h1>Add New Food Item</h1>
            <div>
                <div className='input-wrapper'>
                    <input type="text" placeholder='Enter Food name' name="" id="" className='input-field'

                        onChange={(event) => {
                            setData({
                                ...data,
                                name: event.target.value,
                            })
                        }}
                        value={data.name}
                    />
                </div>
                <div className='input-wrapper'>
                    <input type="text" placeholder='Enter Food Price' name="" id="" className='input-field'

                        onChange={(event) => {
                            setData({
                                ...data,
                                price: event.target.value,
                            })
                        }}
                        value={data.price}
                    />
                </div>
                <div className='input-wrapper'>
                    <input type="text" placeholder='Enter Path' name="" id="" className='input-field'

                        onChange={(event) => {
                            setData({
                                ...data,
                                img_path: event.target.value,
                            })
                        }}
                        value={data.img_path}
                    />
                </div>
                <div className='input-wrapper'>
                    <input type="text" placeholder='Enter Food description' name="" id="" className='input-field'
                        onChange={(event) => {
                            setData({
                                ...data,
                                description: event.target.value,
                            })
                        }}
                        value={data.description}
                    />
                </div>
                <div className='input-wrapper'>
                    <button className='button' onClick={handleFoodItem}>Add Item</button>
                </div>
            </div>
        </div>
    )
}

export default AddFoodItem
