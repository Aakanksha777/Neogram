import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import './Wrapper.css';
import User from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Wrapper = ({children}) => {
  return (
    <div className='main-wrapper'>
    <div className='topbar-box'><Topbar/> </div>
    <div  className='wrapper-container'>
    <Navbar/>
      <main className='wrappper-main-children'><Outlet/></main>
      <User/>
    </div>
    </div>
  )
}

export default Wrapper