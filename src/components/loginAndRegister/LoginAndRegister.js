import React from 'react'
import Carousel from '../carousel/Carousel'
import './LoginAndRegister.css'

const LoginAndRegister = ({children}) => {
  return (
    <div className="login-and-register-container">
      <Carousel/>
      <div className="login-container">
      {children}
      </div>
    </div>
  )
}

export default LoginAndRegister
