import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Topbar.css'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser({})
    navigate('/login')
  }

  return (
    <div className='topbar-container'>
      <h3>neoGram  &#11088;</h3>
      {user.token ?
        <button onClick={handleLogout}>Logout</button>
        :
        <Link to="/login">Login</Link>
      }
    </div>
  )
}

export default Topbar
