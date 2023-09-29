import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { BsFillBookmarksFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

// file
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-main-container">
      <NavLink to="/home" className="navbar-links">
        <AiOutlineHome />
        <span className="navlink-text">Home</span>
      </NavLink>
      <NavLink to="/explore" className="navbar-links">
        <BsFillSearchHeartFill />
        <span className="navlink-text">Explore</span>
      </NavLink>
      <NavLink to="/bookmark" className="navbar-links">
        <BsFillBookmarksFill />
        <span className="navlink-text">Bookmark</span>
      </NavLink>
      <NavLink to="/profile" className="navbar-links">
        {" "}
        <CgProfile />
        <span className="navlink-text">Profile</span>
      </NavLink>
    </div>
  );
};
export default Navbar;
