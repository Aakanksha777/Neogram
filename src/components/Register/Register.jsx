import React, { useState } from "react";
// import "./Register.css";
import "../Login/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import character from "../../assets/character.gif";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showpswd, setShowpswd] = useState(false);
  const navigate = useNavigate();

  const handleLoginInput = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleregisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
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
          toast.success("Successfully Registered");
          navigate("/login");
        } else {
          console.log("User already exists");
        }
      })
      .catch((err) => {
        console.error("Error creating user:", err);
      });
  };

  const handleShowPswd = () => {
    setShowpswd(!showpswd);
  };

  return (
    <div className="login-outer">
      <div className="login-container">
        {/* UPPER  */}
        <div className="login-upper">
          <h2 className="login-header">Signup</h2>
        </div>

        {/* LOWER  */}
        <div className="login-bottom">
          <div className="login-img-container">
            <img src={character} alt="login" className="login-img" />
          </div>

          <form onSubmit={handleregisterSubmit} className="login-form">
            <input
              placeholder="username"
              required
              name="username"
              onChange={handleLoginInput}
              value={registerData.username}
              className="form-inputs"
            />

            <input
              placeholder="email"
              type="email"
              name="email"
              onChange={handleLoginInput}
              value={registerData.email}
              className="form-inputs"
            />
            <input
              placeholder="password"
              type={showpswd ? "text" : "password"}
              name="password"
              onChange={handleLoginInput}
              value={registerData.password}
              className="form-inputs"
            />
            <input
              placeholder="confirm password"
              type={showpswd ? "text" : "password"}
              name="confirmPassword"
              onChange={handleLoginInput}
              value={registerData.confirmPassword}
              className="form-inputs"
            />
            <div className="show-pass-container">
              <span onClick={handleShowPswd} className="show-icon">
                {showpswd ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <button className="login-submit-btn">Signup</button>
            <p>
              Already have Account ?{" "}
              <Link to="/login" className="navigate-signup">
                {" "}
                Login{" "}
              </Link>
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
