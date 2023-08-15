import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext() //create context

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log("this is context empty dependeny use Effect")
        const userExist = JSON.parse(localStorage.getItem("user"))?.token
        if (!user.token && userExist) {
            setUser(userExist)
        }
    }, [])

    useEffect(() => {
        console.log("this is context yser dependeny use Effect")
        user && localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
