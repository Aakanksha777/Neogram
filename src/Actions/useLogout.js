import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  //for navigation
  const navigate = useNavigate();

  //user-context (this contain user or [] ).
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
  }

  // Other actions can be defined here...

  return {
    handleLogout
    // Other actions can be included here if needed...
  };
};
