import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Topbar.css'
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {

    const {loggedin , setLoggedin} = useContext(authContext);

    const navigate = useNavigate();

    const handleLogout = () => {
      console.log("logged out")
      localStorage.clear();
      setLoggedin(!loggedin)
      navigate('/')
      
    }

  return (
    <div className='topbar-container'>
      <h3>neoGram  &#11088;</h3>
      {loggedin && <button onClick={handleLogout}>Logout</button>}
      {!loggedin && <Link to='/'>Login</Link>}
    </div>
  )
}

export default Topbar
