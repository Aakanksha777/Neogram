import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// folders
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import Carousel from "../Carousel";
// step1 to popup
import Popup from "../Popup/Popup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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

  // useEffect-popup-2

  // popup-useEffect-2
  useEffect(() => {
    let timeOut;
    if (showPopUp.status) {
      timeOut = setTimeout(() => {
        setShowPopUp({
          status: false,
          message: "",
        });
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [showPopUp]);

  //controllers
  // popup=function-3
  const handleShowPopUp = (mes) => {
    setShowPopUp({ status: true, message: mes });
  };

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
          alert("logged in ");
          handleShowPopUp(`Logged in`);
          navigate("/home");
        } else {
          handleShowPopUp(`Invalid Credentials.`);
        }
      })
      .catch((e) => {
        console.log(e);
        handleShowPopUp("Error in creating user.");
      });
  };

  const handleShowPswd = () => {
    setShowpswd(!showpswd);
  };

  return (
    <div className="main-login-container">
      <span style={{ color: "purple" }}>Loading...</span>
      <div className="background-carousel">
        <Carousel />
      </div>
      <div className="login-container">
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
            placeholder={showpswd ? "text" : "password"}
            required
          />
          <div className="show-pass-container">
            <span onClick={handleShowPswd} className="show-icon">
              {showpswd ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <button className="submit-btn">Login</button>

          <b>
            Don't have Account ?{" "}
            <Link to="/register" className="navigate-signup">
              {" "}
              Signup{" "}
            </Link>
          </b>
          {showPopUp.status && <Popup>{showPopUp.message}</Popup>}
        </form>
      </div>
    </div>
  );
};

export default Login;
