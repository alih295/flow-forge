import React, { Children, createContext, useState } from 'react'
import '../App.css'

export const UserContext = createContext()


function AppContext({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  return (
    <UserContext.Provider value={{user , setUser , loading , setLoading}}>
        {children}
    </UserContext.Provider>
  )
}

export default AppContext