import React from "react";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

function Vehiclepanel({ setVehiclePanel, setConfirmRidePanel, fare, createRide, selectVehicle }) {
  return (
    <div>
      <p
        className="w-full flex justify-center cursor-pointer mb-2  "
        onClick={() => setVehiclePanel(false)}
      >
        <MdKeyboardArrowDown size={35} />
      </p>
      <h3 className="text-xl font-medium">Choose a vehicle</h3>

      <div className="flex flex-col gap-1">
        <div
          onClick={() => {
            selectVehicle('car')
            setConfirmRidePanel(true);
          }}
          className="flex w-full p-2 mt-2 items-center justify-between border-2 border-gray-100 rounded-md active:border-gray-500 gap-1"
        >
          <img
            className="h-18"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
            alt=""
          />
          <div className="flex flex-col items-start ">
            <h4 className="flex items-center gap-1 font-medium">
              UberGo{" "}
              <span className="flex items-center gap-1 ">
                <FaUser size={12} />4
              </span>
            </h4>
            <h5 className="text-sm font-medium">2 mins away</h5>
            <p className="text-sm font-medium">Affordable compact rides</p>
          </div>
          <h2 className="text-sm">₹{fare.car}</h2>
        </div>
        <div onClick={() => {
            selectVehicle('motorcycle')
            setConfirmRidePanel(true);
          }}  className="flex w-full p-2 mt-2 items-center justify-between border-2 border-gray-100 rounded-md active:border-gray-500 gap-1">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className="flex flex-col ml-8 items-start ">
            <h4 className="flex items-center gap-1 font-medium">
              Moto{" "}
              <span className="flex items-center gap-1 ">
                <FaUser size={12} />1
              </span>
            </h4>
            <h5 className="text-sm font-medium">3 mins away</h5>
            <p className="text-sm font-medium">Affordable motorcycle rides</p>
          </div>
          <h2 className="text-sm">₹{fare.motorcycle}</h2>
        </div>
        <div onClick={() => {
            selectVehicle('auto')
            setConfirmRidePanel(true);
          }} className="flex w-full p-2 mt-2 items-center justify-between border-2 border-gray-100 rounded-md active:border-gray-500 gap-1">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className="flex flex-col ml-[-1] items-start ">
            <h4 className="flex items-center gap-1 font-medium">
              UberAuto{" "}
              <span className="flex items-center gap-1 ">
                <FaUser size={12} />3
              </span>
            </h4>
            <h5 className="text-sm font-medium">3 mins away</h5>
            <p className="text-sm font-medium">Affordable Auto rides</p>
          </div>
          <h2 className="text-sm">₹{fare.auto}</h2>
        </div>
      </div>
    </div>
  );
}

export default Vehiclepanel;
