import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState({firstName:'', lastName:''});
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState();
  const [vehicleType, setVehicleType] = useState("");

  const {captain, setCaptain}=useContext(CaptainDataContext)

  const navigate=useNavigate()

  const submitHandler =async (e) => {
    e.preventDefault();
  
    const CaptainData={
      fullName:fullName,
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,CaptainData )
    if(response.status===200){
      const data= response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail("");
    setPassword("");
    setFullName({firstName:'', lastName:''})
    setVehicleCapacity()
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
  };


  return (
    
    <div className="h-screen w-full flex flex-col items-center  justify-center">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col w-1/3 gap-3  p-3"
      >
        <h2 className="text-2xl font-semibold">What's our captains Name</h2>
        <div className="flex gap-2  ">
          <input
            type="text"
            required
            name=""
            id=""
            value={fullName.firstName}
            onChange={(e)=>setFullName({...fullName,firstName:e.target.value })}
            placeholder="FirstName"
            className="p-2 outline-none w-full placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
          />
          <input
            type="text"
            required
            name=""
            id=""
            value={fullName.lastName}
            onChange={(e)=>setFullName({...fullName,lastName:e.target.value })}
            placeholder="LastName"
            className="p-2 outline-none w-full placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
          />
        </div>

        <h2 className="text-2xl font-semibold">What's our captains email</h2>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name=""
          id=""
          placeholder="email here"
          className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <h2 className="text-2xl font-semibold">Enter Password</h2>
        <input
          type="text"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password here"
          className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <h2 className="text-2xl font-semibold">Vehicle Information</h2>
        <input
          type="text"
          required
          value={vehicleColor}
          onChange={(e) => setVehicleColor(e.target.value)}
          placeholder="Vehicle Color"
          className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <input
          type="text"
          required
          value={vehiclePlate}
          onChange={(e) => setVehiclePlate(e.target.value)}
          placeholder="Vehicle Plate"
          className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <input
          type="number"
          required
          value={vehicleCapacity}
          onChange={(e) => setVehicleCapacity(e.target.value)}
          placeholder="Vehicle Capacity"
          className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <select
          required
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="p-2 outline-none bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="motor">Motor</option>
        </select>
        <button
          type="submit"
          className="text-xl  py-2  text-white bg-black/70 font-semibold cursor-pointer  hover:bg-black/50"
        >
          Create Captain account
        </button>
      </form>
      <p className="font-medium text-center">
        Already have account?{" "}
        <Link to="/captain-login" className="text-blue-500">
          Login here 
        </Link>
      </p>
       
    </div>
  )
}

export default CaptainSignup