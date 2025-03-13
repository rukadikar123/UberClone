import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../Context/userContext'
import { useNavigate } from 'react-router-dom'


function UserProtectWrapper({children}) {

    const token=localStorage.getItem('token')
    const {user}=useContext(UserDataContext)
    const navigate=useNavigate()

    useEffect(() => {
      if(!user?.email || !token){
        navigate('/login')
    }
    }, [token])
    
    
 
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper