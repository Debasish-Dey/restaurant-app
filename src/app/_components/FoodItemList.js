
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const FoodItemList = () => {

  const router=useRouter();

  const [fooditems, setFooditems] = useState([]);

  useEffect(() => {
    loadFoodItems();
  }, []);


  const deletefooditem = async (resto_id) => {
    let response = await fetch("http://localhost:3000/api/restaurents/foods/"+ resto_id ,{
      method: "DELETE",
    });
    response = await response.json();
    if (response.success) {
      loadFoodItems();
    }
    else {
      alert("Food item is not deleted");
    }
    
  }

  const loadFoodItems = async () => {

    const restaurentData=JSON.parse(localStorage.getItem("user"));
    let resto_id=restaurentData._id;
    let response = await fetch("http://localhost:3000/api/restaurents/foods/"+ resto_id);
    response = await response.json();
    if (response.success) {
      setFooditems(response.result);
    }
    else {
      alert("Food item list not loading");
    }
  }

  return (
    <div>
      <h1>Food Items</h1>
      <table>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          { fooditems &&  fooditems.map((items, key) => (
            <tr  key={key}>
              <td>{key+1}</td>
              <td>{items.name}</td>
              <td>{items.price}</td>
              <td className='size'>{items.description}</td>
              <td><img src={items.img_path} alt="Image of food" /></td>
              <td>
                <button  onClick={() => deletefooditem(items._id)}>Delete</button>
                <button onClick={()=>router.push("dashboard/"+items._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br /><br />
    </div>
  )
}

export default FoodItemList
