import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Restaurentsignup = () => {


  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    // confirmpassword: "",
    city: "",
    address: "",
    contact: "",
  });

  const [confirmpassword, setConfirmpassword] = useState("");

  // const [passworderror, setPassworderror] = useState(false);
  // const [emptyfield, setEmptyfield] = useState(false);

  const router = useRouter();


  const handleSignup = async () => {

    if(data.name==""){
      alert("Name cant be empty");
      return;
    }
    if(data.city==""){
      alert("City cant be empty");
      return;
    }
    if(data.address==""){
      alert("Address cant be empty");
      return;
    }
    if(data.email==""){
      alert("Email cant be empty");
      return;
    }
    if(data.password==""){
      alert("Password cant be empty");
      return;
    }
    if(data.contact==""){
      alert("Contact cant be empty");
      return;
    }

    if(data.password!=confirmpassword){
      alert("Password not matched");
      return
    }
    console.log(data);

    let response = await fetch("http://localhost:3000/api/restaurents", {
      method: "POST",
      body: JSON.stringify(data)
    })

    response = await response.json();
    console.log(response);

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem('user', JSON.stringify(result));
      router.push('/restaurant/dashboard')
      // router.push('/')

    } else {
      alert("failed")
    }
  }

  // if(confirmpassword != data.password){
  //   setPassworderror(true);
  // }

  return (
    <div>
      <div>
        <h2>Signup Here</h2>
        <div>
          <div className='input-wrapper'>
            <input type="text" placeholder='Enter Restaurant name' name="" id="" className='input-field'
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
            <input type="text" placeholder='Enter City' name="" id="" className='input-field'
              onChange={(event) => {
                setData({
                  ...data,
                  city: event.target.value,
                })
              }}
              value={data.city}
            />
          </div>
          <div className='input-wrapper'>
            <input type="text" placeholder='Enter Full Adress' name="" id="" className='input-field'
              onChange={(event) => {
                setData({
                  ...data,
                  address: event.target.value,
                })
              }}
              value={data.address}
            />
          </div>
          <div className='input-wrapper'>
            <input type="email" placeholder='Enter email-id' name="" id="" className='input-field'

              onChange={(event) => {
                setData({
                  ...data,
                  email: event.target.value,
                })
              }}
              value={data.email} />
          </div>
          <div className='input-wrapper'>
            <input type="password" placeholder='Enter Password' name="" id="" className='input-field'

              onChange={(event) => {
                setData({
                  ...data,
                  password: event.target.value,
                })
              }}
              value={data.password} />
          </div>
          <div className='input-wrapper'>
            <input type="password" placeholder='Confirm Password' name="" id="" className='input-field'
              onChange={(event) => {
                setConfirmpassword(event.target.value)
              }}
              // value={confirmpassword}
            />
            { confirmpassword!=data.password ? <span className='input-error'>Password not matched</span>:<></>}
          </div>

          <div className='input-wrapper'>
            <input type="text" placeholder='Enter contact No.' name="" id="" className='input-field'
              onChange={(event) => {
                setData({
                  ...data,
                  contact: event.target.value,
                })
              }}
              value={data.contact}
            />
          </div>
          <div className='input-wrapper'>
            <button className='button' onClick={handleSignup}>Sign up</button>
          </div>
        </div>
        {/* {JSON.stringify(data)}; */}
        {/* {confirmpassword} */}
      </div>
    </div>
  )
}

export default Restaurentsignup
