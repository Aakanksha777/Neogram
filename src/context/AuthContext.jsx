import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext() //create context
const inventoryData = []

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem("user")).token
        if (!user.token && userExist) {
            setUser(userExist)
        }
    }, [])
    useEffect(() => {
        user && localStorage.setItem("user", JSON.stringify(user))
    }, [user])
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
