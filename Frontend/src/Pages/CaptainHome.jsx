import React, { useContext, useEffect, useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useSocket } from "../Context/SocketContext";
import { CaptainDataContext } from "../Context/CaptainContext";

function CaptainHome() {
const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)


const ridePopUpPanelRef=useRef(null)
const confirmRidePopupPanelRef=useRef(null)

const {socket}=useSocket()
const {captain}=useContext(CaptainDataContext)

useEffect(()=>{
    socket.emit('join', {userId:captain._id, userType:'captain'})

},[captain])


const updateLocation=()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
      socket.emit('update-location-captain',{
        userId:captain._id,
        location:{
          ltd:position.coords.latitude,
        lng:position.coords.longitude
        }
      })
    })
  }
}
const locationInterval=setInterval(updateLocation, 1000)
updateLocation()

useGSAP(
  function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(-20%)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  },
  [ridePopUpPanel]
);

useGSAP(
  function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(-20%)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  },
  [confirmRidePopupPanel]
);


  return (
    <>
      <div className="flex w-full h-screen gap-20 p-16 justify-between overflow-hidden">
          <CaptainDetails/>

          <div ref={ridePopUpPanelRef}
          className="fixed bottom-0 w-[38vw] ml-2 mt-1 h-[70vh] bg-white overflow-auto translate-y-full scrollbar-none  "
        >
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
        <div ref={confirmRidePopupPanelRef}
          className="fixed bottom-0 w-[38vw] ml-2 mt-1 h-[75vh] bg-white overflow-auto translate-y-full scrollbar-none  "
        >
          <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopUpPanel={setRidePopUpPanel} />
        </div>

        <div className="h-full  w-[60%]">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default CaptainHome;
