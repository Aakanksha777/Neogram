import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Wrapper.css";
import User from "../Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Wrapper = () => {
  // import auth context

  const { user } = useContext(AuthContext);

  return user.token ? (
    <div className="main-wrapper">
      {/* this is the wrapper  */}
      <div className="wrapper-container">
        <Navbar />
        <main className="wrappper-main-children">
          <Outlet />
        </main>
        <User />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Wrapper;

//1. imported AuthContext.
//2. return has a condition.
//3. if user.token is true show div which contains navbar, outlet, user[sidebar].
//4. if user.token is false , navigate to login.
