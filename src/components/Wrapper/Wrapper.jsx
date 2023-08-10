import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import './Wrapper.css';
import User from '../Sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Wrapper = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.token) {
      navigate("/login")
    }
  }, [])

  return (
    <div className='main-wrapper'>
      <div className='topbar-box'><Topbar /> </div>
      <div className='wrapper-container'>
        <Navbar />
        <main className='wrappper-main-children'><Outlet /></main>
        <User />
      </div>
    </div>
  )
}

export default Wrapper