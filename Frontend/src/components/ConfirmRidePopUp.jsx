import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiCurrencyFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmRidePopUp({setRidePopUpPanel,setConfirmRidePopupPanel, ride}) {
  const [otp, setOtp]=useState('')

  const navigate=useNavigate()

const submitHandler=async(e)=>{
  e.preventDefault()  
  const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
    params:{
      rideId:ride?._id,
    otp:otp
    },
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })

  if(response.status===200){
    setConfirmRidePopupPanel(false)
    setRidePopUpPanel(false)
    navigate('/captain-riding', { state: { ride } })
  }
} 

  return (
    <div>
        <div className="p-2">
              <p onClick={()=>{
                setConfirmRidePopupPanel(false)
                setRidePopUpPanel(false)
              }}
              className="w-full flex justify-center cursor-pointer   ">
                <MdKeyboardArrowDown size={35} />
              </p>
              <h3 className="text-2xl font-medium mb-6">Confirm this ride to start</h3>
              <div className="flex justify-between items-center bg-yellow-300 rounded-lg p-3 mb-6">
                <div className="flex justify-between items-center gap-4">
                  <div className="p-2 bg-gray-200 rounded-full ">
                    <img
                      className="h-10"
                      src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
                      alt=""
                    />
                  </div>
                  <h1 className="text-xl font-medium capitalize">{ride?.user?.fullName?.firstName}</h1>
                </div>
               <h1 className="text-lg font-medium">2.2 KM</h1>
              </div>
              <div className="flex flex-col items-center w-full gap-1">
               
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center gap-8 border-b-1 p-1 border-gray-400">
                    <p>
                      <LuMapPin size={20} />
                    </p>
                    <div className="flex flex-col">
                      <h2 className="text-md font-medium">562/11-A</h2>
                      <p className="text-sm">{ride?.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 border-b-1 p-1 border-gray-400">
                    <p>
                      <RiMapPinUserFill size={20} />
                    </p>
                    <div className="flex flex-col">
                      <h2 className="text-md font-medium">562/11-A</h2>
                      <p className="text-sm">{ride?.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8  p-1 border-gray-400">
                    <p>
                      <RiCurrencyFill size={20} />
                    </p>
                    <div className="flex flex-col">
                      <h2 className="text-md font-medium">₹{ride?.fare}</h2>
                    </div>
                  </div>
                </div>
                <div className='w-full mt-4'>
                <form onSubmit={submitHandler} className='w-full flex flex-col gap-1 '>
                  <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder='Enter OTP'  className='font-mono rounded-md bg-[#eee] p-2'/>
                <button 
                  className="w-full text-center bg-green-500 rounded-sm p-2 mt-2 text-white text-xl font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {setConfirmRidePopupPanel(false)
                    setRidePopUpPanel(false)
                  }}
                  className="w-full bg-red-600 rounded-sm p-2 mt-2 text-white text-xl cursor-pointer font-medium"
                >
                  Cancel
                </button>
                </form>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ConfirmRidePopUp