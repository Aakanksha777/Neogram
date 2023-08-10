import React from 'react'
import { Navigate } from 'react-router'

const RequireAuth = ({Outlet, isLoggedin}) => {
  return isLoggedin ? <Outlet/> : <Navigate to='/login'/>
}
export default RequireAuth
