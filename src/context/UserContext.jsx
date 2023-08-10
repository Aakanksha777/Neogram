import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

export function UserProvider ({children}) {
    const [loggedinuser, setloggedinuser ] = useState({});

    
    // useEffect(() => {
    //     const userExist = JSON.parse(localStorage.getItem("token"))
    //     userExist && setloggedinuser(userExist)
    // }, [])
    
    console.log(loggedinuser)

return (
    <userContext.Provider value={{loggedinuser, setloggedinuser}}>
        {children}
    </userContext.Provider>
)
}