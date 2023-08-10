import React, {createContext, useState } from 'react'

export const authContext = createContext() //create context

export function AuthProvider ({children}) {

    const [user, setUser ] = useState({})
    const [bookmarked, setBookmarked ] = useState([]);
    const [loggedin, setLoggedin ] = useState(false);

    console.log("user kya hia", user);
    return (
        <authContext.Provider value={{user, setUser, setBookmarked, bookmarked, loggedin, setLoggedin}}>
            {children}
        </authContext.Provider>
    )
}