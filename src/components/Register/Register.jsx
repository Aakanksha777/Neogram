import React, { useState } from 'react'
import './Register.css'
import { useNavigate , Link } from 'react-router-dom';

const Register = () => {

  const [registerData, setRegisterData ] = useState({
    username :"",
    email :"",
    password :"",
    confirmPassword :"",
  }) 

  const [showpswd, setShowpswd ] = useState(false);

  const navigate = useNavigate();

  const handleLoginInput = (e) => {
    e.preventDefault();
    setRegisterData({...registerData, [ e.target.name ] :  e.target.value})
    console.log("registerData", registerData)
  }

  const handleregisterSubmit = (e) => {
    e.preventDefault();
    debugger;
    console.log("a",JSON.stringify(registerData))

    if (registerData.password !== registerData.confirmPassword) return
    fetch("/api/auth/signup", {
      method :"post",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(registerData)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data)
    if(data.encodedToken) {
      navigate("/login")
    }
    else{
      alert("User Already Exists.")
    }
    })
    .catch((err) => alert("Error in creating user.", err))
  }

  const handleShowPswd = () => {
    setShowpswd(!showpswd);
  }

  return (
    <>
    <form className='register-container' onSubmit={handleregisterSubmit}>
        <h2>Signup</h2>
        <input placeholder='username' required name='username' onChange={handleLoginInput} value={registerData.username}/>
        <input placeholder='email' type='email' name='email' onChange={handleLoginInput} value={registerData.email}/>
        <input placeholder='password' type={showpswd ? 'text' : 'password'} name='password' onChange={handleLoginInput} value={registerData.password}/>
        <input placeholder='confirm password' type={showpswd ? 'text' : 'password'} name='confirmPassword' onChange={handleLoginInput} value={registerData.confirmPassword}/>

        <div><span onClick={handleShowPswd} >&#128065;</span></div>

        <button>Submit</button>

        <b>Already Have Account ? <Link to='/'> Login </Link></b>
    </form>
    </>
  )
}

export default Register
