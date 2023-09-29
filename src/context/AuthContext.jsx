import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); //create context

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("this is context empty dependeny use Effect");
    const userExist = JSON.parse(localStorage.getItem("user"))?.token;
    if (!user.token && userExist) {
      setUser(userExist);
    }
  }, []);

  useEffect(() => {
    console.log("this is context yser dependeny use Effect");
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
