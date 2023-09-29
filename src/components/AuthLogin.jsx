import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";

const AuthLogin = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div>
        <FcGoogle />
        <button onClick={() => loginWithRedirect()}>Google </button>
      </div>
    )
  );
};

export default AuthLogin;
