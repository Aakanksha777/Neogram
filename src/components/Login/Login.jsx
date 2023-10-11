import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// folders
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import Carousel from "../carousel/Carousel";
// step1 to popup
import Popup from "../Popup/Popup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoginAndRegister from "../loginAndRegister/LoginAndRegister";
// auth

const Login = () => {
  // popup-state-1
  const [showPopUp, setShowPopUp] = useState({
    status: false,
    message: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showpswd, setShowpswd] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // toastify

  const handleLoginInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData), // {username : logindata.username, pswd : logindata.pswd}
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.encodedToken) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data.foundUser, token: data.encodedToken })
          ); // waste for now because backend can not store token after refresh
          setUser({ ...data.foundUser, token: data.encodedToken });
          toast.success("Successfully loggedin");
          navigate("/home");
        } else {
          alert(`Invalid Credentials.`);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Error in creating user.");
      });
  };

  const handleShowPswd = () => {
    console.log("checked handleShowPswd");
    setShowpswd(!showpswd);
  };

  const handleGuestMode = () => {
    console.log("checking guest mode");
    setLoginData({ username: "bhumi", password: "123" });
  };

  return (
    <LoginAndRegister>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <h2 className="login-header">Login</h2>
        <input
          placeholder="username"
          required
          name="username"
          onChange={handleLoginInput}
          value={loginData.username}
        />

        <input
          value={loginData.password}
          onChange={handleLoginInput}
          name="password"
          placeholder="password"
          type={showpswd ? "text" : "password"}
          required
        />
        <div className="show-pass-container">
          <span onClick={handleShowPswd} className="show-icon">
            {showpswd ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button className="submit-btn">Login</button>
        {/* guest mode  */}
        <button onClick={handleGuestMode}>Guest Mode</button>
        <b>
          Don't have Account ?{" "}
          <Link to="/register" className="navigate-signup">
            {" "}
            Signup{" "}
          </Link>
        </b>
        <ToastContainer />
      </form>
    </LoginAndRegister>
  );
};

export default Login;
