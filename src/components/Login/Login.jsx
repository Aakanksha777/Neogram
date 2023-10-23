import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// files
import "./Login.css";
import LoginAndRegister from "../loginAndRegister/LoginAndRegister";

// context
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showpswd, setShowpswd] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

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
    setShowpswd(!showpswd);
  };

  const handleGuestMode = () => {
    setLoginData({ username: "bhumi", password: "123" });
    toast.success("Successfully Guest loggedin");
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
