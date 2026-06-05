import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

const Signup = () => {

  const [SignupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...SignupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    const {name,email,password} = SignupInfo;
    if(!name || !email || !password){
        return handleError('name , email and password are required');
    }
    try {
      const url = "http://localhost:1000/auth/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(SignupInfo)
      })
      const result = await response.json();
      const { success, message ,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }else if(error){
          const details = error?.details[0].message;
          handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (error) {
        handleError(error);
    }
  }

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name : </label>
          <input type="text" name="name" placeholder='enter you name' autoFocus onChange={handleChange} value={SignupInfo.name}/>
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input type="email" name="email" placeholder='enter you email' onChange={handleChange} value={SignupInfo.email}/>
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input type="password" name="password" placeholder='enter you password' onChange={handleChange} value={SignupInfo.password}/>
        </div>
        <button>Signup</button>
        <span>Already have an account ?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
