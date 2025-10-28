import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth()

    if(loading) {
        return <div>Loading...</div>
    }

    if(currentUser) {
        console.log("User is authenticated:", currentUser)
        return children
    }
    
    return <Navigate to = "/login" replace={true} />
}

export default PrivateRoute