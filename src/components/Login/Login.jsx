import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// folders 
import { authContext } from '../../context/AuthContext';
import './Login.css';
import { userContext } from '../../context/UserContext';

const Login = () => {

  const [loginData, setLoginData ] = useState(
    {
   
    username :"",
    password :""
  });

  const [showpswd, setShowpswd ] = useState(false);

  const navigate = useNavigate();
  const { setloggedinuser } = useContext(userContext);
  const { setLoggedin} = useContext(authContext)

  const handleLoginInput = (e) => {
    setLoginData({...loginData, [e.target.name] : e.target.value})
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method:"POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(loginData)// {username : logindata.username, pswd : logindata.pswd}
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("login data", data)
        localStorage.setItem("token", data.encodedToken)
        if(data.encodedToken) {
          setloggedinuser(data.foundUser);
          setLoggedin(true);
          navigate("/home")
        } else {
          alert("token not found ")
        }
    })
    .catch(e => console.log(e))
  }
 
  const handleShowPswd = () => {
    setShowpswd(!showpswd);
  }


  return (
    <form onSubmit={handleLoginSubmit} className='login-form'>

        <h3>Login</h3>
        <input 
        placeholder='username' 
        type='text' 
        value={loginData.username} 
        onChange={handleLoginInput} 
        name='username'
        required />

        <input 
        placeholder='password' 
        type={showpswd ? 'text' : 'password'}
        value={loginData.password} 
        onChange={handleLoginInput} 
        name='password' 
        required />

<div><span onClick={handleShowPswd} className='show-icon'>&#128065;</span></div>

        <button>Login</button>

        <b>Don't have Account? <Link to='/register'> Signup </Link>
        </b>
    </form>
  )
}

export default Login
