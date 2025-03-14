import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext'
import axios from 'axios'


function UserProtectWrapper({children}) {
  const [isLoading, setIsLoading]=useState(true)

    const {user, setUser}=useContext(UserDataContext)  
    const token=localStorage.getItem('token')
    const navigate=useNavigate()

    useEffect(() => {
      if(!token){
        navigate('/login')
    }
    }, [token])
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      if(res.status===200){
        const data =res.data
        setUser(data.user)
        setIsLoading(false)
      }
    }).catch((err)=>{
      console.log(err);
      navigate('/login')
      localStorage.removeItem('token')
    })

    if(isLoading){
      return (
          <div className='text-3xl text-center'>Loading...</div>
      )
  }

    
 
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper