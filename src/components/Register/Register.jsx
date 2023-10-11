import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import AuthLogout from "../AuthLogout";
import Carousel from "../carousel/Carousel";
import Popup from "../Popup/Popup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoginAndRegister from "../loginAndRegister/LoginAndRegister";
// import Loader from "../loader/Loader";

const Register = () => {
  // popup-state-1
  const [showPopUp, setShowPopUp] = useState({
    status: false,
    message: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showpswd, setShowpswd] = useState(false);
  const navigate = useNavigate();

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

  // controllers

  // popup=function-3
  const handleShowPopUp = (mes) => {
    setShowPopUp({ status: true, message: mes });
  };

  const handleLoginInput = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleregisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      handleShowPopUp("Passwords do not match.");
      return;
    }
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.encodedToken) {
          localStorage.setItem("encodedToken", data.encodedToken);
          console.log("Success: Data has an encodedToken");
          alert("register");
          handleShowPopUp("Success");
          navigate("/login");
        } else {
          console.log("User already exists");
          handleShowPopUp(`User Already Exists.`);
        }
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        handleShowPopUp("Error in creating user.");
      });
  };

  const handleShowPswd = () => {
    setShowpswd(!showpswd);
  };

  return (
    <LoginAndRegister>
      <form className="login-form" onSubmit={handleregisterSubmit}>
        <h2 className="signup-heading">Signup</h2>
        {/* <Loader /> */}
        <input
          placeholder="username"
          required
          name="username"
          onChange={handleLoginInput}
          value={registerData.username}
        />
        <input
          placeholder="email"
          type="email"
          name="email"
          onChange={handleLoginInput}
          value={registerData.email}
        />
        <input
          placeholder="password"
          type={showpswd ? "text" : "password"}
          name="password"
          onChange={handleLoginInput}
          value={registerData.password}
        />
        <input
          placeholder="confirm password"
          type={showpswd ? "text" : "password"}
          name="confirmPassword"
          onChange={handleLoginInput}
          value={registerData.confirmPassword}
        />

        <div className="show-pass-container">
          <span onClick={handleShowPswd} className="show-icon">
            {showpswd ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        <button className="submit-btn">Submit</button>
        <AuthLogout />

        <b>
          Already have Account ?{" "}
          <Link to="/" className="login-link">
            {" "}
            Login{" "}
          </Link>
        </b>
        {showPopUp.status && <Popup>{showPopUp.message}</Popup>}
      </form>
    </LoginAndRegister>
  );
};

export default Register;
