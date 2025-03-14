import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext'
import axios from 'axios'

function CaptainLogout() {

  const token=localStorage.getItem('token')
  const navigate=useNavigate()

  axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }).then((res)=>{
    if(res.status===200){
      localStorage.removeItem('token')
      navigate('/captain-login')
    }
  })

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout