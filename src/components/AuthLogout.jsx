import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";

const AuthLogout = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <FcGoogle />
        <button onClick={() => logout()}>Google </button>
      </div>
    )
  );
};

export default AuthLogout;
