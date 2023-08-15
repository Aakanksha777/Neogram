import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Wrapper.css";
import User from "../Sidebar/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../loadingSpinner/loader";

const Wrapper = () => {
  const { user } = useContext(AuthContext);

  // This was causing error sometimes so I moved the logic to return directly
  // useEffect(() => {
  //   if (!user.token) {
  //     navigate("/login")
  //   }
  // }, [])

  return user.token ? (
    <div className="main-wrapper">
      <div className="wrapper-container">
        <Navbar />
        <main className="wrappper-main-children">
          <Outlet />
        </main>
        <User />
      </div>
      <Loader />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Wrapper;
