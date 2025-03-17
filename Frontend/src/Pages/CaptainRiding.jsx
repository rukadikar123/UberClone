import React, { useRef, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

function CaptainRiding() {
    const [finishRidePanel, setFinishRidePanel]=useState(false)
    

    const finishRidePanelRef=useRef(null)


    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(0%)",
            });
          } else {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [finishRidePanel]
      );

  return (
    <div className="h-screen w-full">
      <Link to="/home" className="fixed text-3xl top-4 left-16 font-bold">
        Uber
      </Link>
      <Link to="/captain-login" className="fixed top-4 right-16">
        <IoExitOutline size={35} />
      </Link>
      <div className="flex pt-16 px-10 flex-col gap-2 h-full w-full">
        <div className=" h-[75%]  w-full">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
            alt=""
          />
        </div>
        <div className="bg-yellow-400 h-[25%] pt-6">
          <p
             onClick={()=>setFinishRidePanel(true)}
            className="w-full flex justify-center cursor-pointer   "
          >
            <MdKeyboardArrowUp size={35} />
          </p>
          <div className=" flex items-center justify-around bg-yellow-400">
            <h2 className="text-xl font-medium">4 KM Away</h2>
            <button className="bg-green-700 text-white rounded-md px-3 py-2">
              Complete Ride
            </button>
          </div>
          <div ref={finishRidePanelRef}
          className="fixed bottom-0 w-[95%] mt-1 h-[80vh] bg-white overflow-auto translate-y-full scrollbar-none  "
        >
          <FinishRide  setFinishRidePanel={setFinishRidePanel} />
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default CaptainRiding;
