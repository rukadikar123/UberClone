import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'

function CaptainProtectWrapper({children}) {
    const [isLoading, setIsLoading]=useState(true)
    
    const {captain, setCaptain}=useContext(CaptainDataContext)
    const token=localStorage.getItem('token')
    const navigate=useNavigate()


    useEffect(() => {
      if(!token){
        navigate('/captain-login')
    }
    }, [token])
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      if(res.status===200){
        const data =res.data
        setCaptain(data.captain)
        setIsLoading(false)

      }
    })
    .catch((error)=>{
      console.log(error);
      localStorage.removeItem('token')
      navigate('/captain-login')
      
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

export default CaptainProtectWrapper