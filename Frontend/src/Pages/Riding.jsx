import React, { useContext } from "react";
import { LuMapPin } from "react-icons/lu";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiCurrencyFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import LiveTracking from "../components/LiveTracking";

function Riding() {
  const {socket}=useContext(SocketContext)
  const navigate=useNavigate()

  const location=useLocation()
  const {ride}=location.state

  socket.on('ride-ended', ()=>{
  navigate('/home')
  } )
  return (
    <div className="flex w-full h-screen gap-20 p-10 justify-between overflow-hidden">
      <div className="w-[40%] mx-4 my-20">
        <Link to='/home' className="fixed top-8 left-6"><IoMdHome size={35}/></Link>
        <div className="flex justify-between  items-center">
          {" "}
         <LiveTracking/>
          <div className="flex flex-col gap-1 items-end ">
            <h2 className="text-lg font-medium capitalize">{ride?.captain?.fullName?.firstName}</h2>
            <h1 className="text-xl font-medium">{ride?.captain?.vehicle?.plate}</h1>
            <p>Maruti suzuki alto</p>
          </div>
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
            <button className="w-full bg-green-500 rounded-sm p-1 mt-2 text-white text-xl font-medium">Make a Payment</button>
          </div>
        </div>
      </div>

      <div className="h-full  w-[60%]">
        <img
          className="h-full w-full object-cover rounded-2xl"
          src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Riding;
