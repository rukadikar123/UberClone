import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiCurrencyFill } from "react-icons/ri";

function LookingForDriver({setVehicleFound}) {
  return (
    <>
         <div>
              <p  onClick={()=>setVehicleFound(false)} className="w-full flex justify-center cursor-pointer   ">
                <MdKeyboardArrowDown size={35} />
              </p>
              <h3 className="text-xl font-medium mb-1">Looking For a Driver</h3>
              <div className="flex flex-col items-center w-full gap-1">
                <img
                  className="h-40 w-1/2"
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
                  alt=""
                />
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-8 border-b-1 p-1 border-gray-400">
                        <p><LuMapPin size={20} /></p>
                        <div className="flex flex-col">
                            <h2 className="text-md font-medium">562/11-A</h2>
                            <p className="text-sm">Kakriya talab, Bhopal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 border-b-1 p-1 border-gray-400">
                        <p><RiMapPinUserFill size={20} /></p>
                        <div className="flex flex-col">
                            <h2 className="text-md font-medium">562/11-A</h2>
                            <p className="text-sm">Kakriya talab, Bhopal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8  p-1 border-gray-400">
                        <p><RiCurrencyFill size={20} />
                        </p>
                        <div className="flex flex-col">
                            <h2 className="text-md font-medium">Rs.192</h2>
                        </div>
                    </div>
                </div>
               
              </div>
            </div>
    </>
  )
}

export default LookingForDriver