import React from 'react'
import {NavLink } from 'react-router-dom';
import  {AiOutlineHome } from 'react-icons/ai'
import {BsFillSearchHeartFill } from 'react-icons/bs'
import {BsFillBookmarksFill } from 'react-icons/bs'
import {CgProfile } from 'react-icons/cg'



// file 
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-main-container'>

      <NavLink to='/home' className='navbar-links'><AiOutlineHome/>Home</NavLink>
      <NavLink to='/explore' className='navbar-links'><BsFillSearchHeartFill/>  Explore</NavLink>
      <NavLink to='/bookmark' className='navbar-links'>< BsFillBookmarksFill/> Bookmark</NavLink>
      <NavLink to='/profile' className='navbar-links'> <CgProfile/> Profile</NavLink>
    </div>
  )
}
export default Navbar
