import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLogout } from "../../Actions/useLogout";
// files
import Navbar from "../Navbar/Navbar";
import "./Wrapper.css";
import User from "../Sidebar/Sidebar";

// context
import { AuthContext } from "../../context/AuthContext";

const Wrapper = () => {
  //  useContext-USER
  const { user } = useContext(AuthContext);
  const { handleLogout } = useLogout();

  //  If User.Token exists return Homepage , else navigate to Loginpage
  return user.token ? (
    <div className="page-layout">
      <div className="logout-btn-container">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      {/* leftbar + main-section + rightbar */}
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
