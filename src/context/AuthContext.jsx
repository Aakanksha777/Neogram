import React, { createContext, useEffect, useState } from "react";

//creating context
export const AuthContext = createContext();

// AuthProvider-function
export function AuthProvider({ children }) {
  // useState for "USER"
  const [user, setUser] = useState({});

  // useEffect for checking whether User is already exists or not. if exists- setUser(userToken), else [].
  useEffect(() => {
    console.log("User is Exists already.");
    const userExist = JSON.parse(localStorage.getItem("user"))?.token;
    if (!user.token && userExist) {
      setUser(userExist);
    }
  }, []);

  // useEffect for storing user in local storage.
  useEffect(() => {
    console.log("storing user in local storage.");
    user && localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

//1. make a state. const [user, setUser] = useState({})
//2. useEffect , simply create a variable called userExist.
//3. in userExist , we're parsing user.token from local storage.
//4. if user.token is true
//  If the token property doesn't exist, userExist will be undefined.
