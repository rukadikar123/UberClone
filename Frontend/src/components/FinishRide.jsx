import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiCurrencyFill } from "react-icons/ri";
import { Link } from "react-router-dom";
function FinishRide({ setFinishRidePanel }) {
  return (
    <div>
      <div className="p-2">
        <p
          onClick={() => setFinishRidePanel(false)}
          className="w-full flex justify-center cursor-pointer   "
        >
          <MdKeyboardArrowDown size={35} />
        </p>
        <h3 className="text-2xl font-medium mb-6">Finish this ride</h3>
        <div className="flex justify-between items-center bg-yellow-300 rounded-lg p-3 mb-6">
          <div className="flex justify-between items-center gap-4">
            <div className="p-2 bg-gray-200 rounded-full ">
              <img
                className="h-10"
                src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
                alt=""
              />
            </div>
            <h1 className="text-xl font-medium">Rahul </h1>
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
                <p className="text-sm">Kakriya talab, Bhopal</p>
              </div>
            </div>
            <div className="flex items-center gap-8 border-b-1 p-1 border-gray-400">
              <p>
                <RiMapPinUserFill size={20} />
              </p>
              <div className="flex flex-col">
                <h2 className="text-md font-medium">562/11-A</h2>
                <p className="text-sm">Kakriya talab, Bhopal</p>
              </div>
            </div>
            <div className="flex items-center gap-8  p-1 border-gray-400">
              <p>
                <RiCurrencyFill size={20} />
              </p>
              <div className="flex flex-col">
                <h2 className="text-md font-medium">Rs.192</h2>
              </div>
            </div>
            <Link
              to="/captain-home"
              className=" text-center  bg-green-500 rounded-sm p-2 mt-2 text-white text-xl font-medium"
            >
              Finish Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
