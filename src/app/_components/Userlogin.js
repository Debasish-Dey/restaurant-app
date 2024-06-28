import React, { useState } from 'react'
import { useRouter } from 'next/navigation';


const Userlogin = () => {

  const router = useRouter();


  const [data, setData] = useState({
    email: "",
    password: "",
    login:true,
  });

  const handleLogin = async () => {
    console.log(data.email, data.password);
    if (data.email == "") {
      alert("Email cant be empty");
      return;
    }
    if (data.password == "") {
      alert("Password cant be empty");
      return;
    }

    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify(data)
    })

    response = await response.json();
    // console.log(response);

    if (response.success) {
      
      const { result } = response;
      delete result.password;
      localStorage.setItem('username', JSON.stringify(result));
      router.push('/')
      alert("Login successfull")
    } else {
      alert("Either email or password not matched")
    }
  }
  return (
    <div>
      <div>
        <h2>Login Here</h2>
        <div>
          <div className='input-wrapper'>
            <input type="email" placeholder='Enter email-id' name="" id="" className='input-field'
              onChange={(event) => {
                setData({
                  ...data,
                  email: event.target.value,
                })
              }}
              value={data.email}
            />
          </div>
          <div className='input-wrapper'>
            <input type="password" placeholder='Enter Password' name="" id="" className='input-field'
              onChange={(event) => {
                setData({
                  ...data,
                  password: event.target.value,
                })
              }}
              value={data.password}
            />
          </div>
          <div className='input-wrapper'>
            <button className='button' onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userlogin
