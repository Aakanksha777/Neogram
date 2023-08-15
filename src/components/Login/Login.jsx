import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// folders 
import { AuthContext } from '../../context/AuthContext';
import './Login.css';
import { TextField } from '../TextField/TextField';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [showpswd, setShowpswd] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)

  const handleLoginInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(loginData)// {username : logindata.username, pswd : logindata.pswd}
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.encodedToken) {
          localStorage.setItem("user", JSON.stringify({ ...data.foundUser, token: data.encodedToken })) // waste for now because backend can not store token after refresh
          setUser({ ...data.foundUser, token: data.encodedToken });
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
    <div className='login-container'>
      <form onSubmit={handleLoginSubmit} className='login-form'>
        <h3>Login</h3>

        <TextField
          value={loginData.username}
          onChange={handleLoginInput}
          inputName='username'
          label="Username"
          required
        />

        <TextField
          value={loginData.password}
          onChange={handleLoginInput}
          inputName='password'
          label='Password'
          inputType={showpswd ? 'text' : 'password'}
          required
        >
          <div className='show-pass-container'><span onClick={handleShowPswd} className='show-icon'>{showpswd ? <AiFillEyeInvisible /> : <AiFillEye />}</span></div>
        </TextField>
        <button>Login</button>

        <b>Don't have Account? <Link to='/register'> Signup </Link>
        </b>
      </form>
    </div>
  )
}

export default Login

