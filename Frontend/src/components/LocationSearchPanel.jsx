import React from "react";
import { IoLocation } from "react-icons/io5";

function LocationSearchPanel({setPanelOpen ,setVehiclePanel}) {
  const locations = [
    "24B, Near Gandhi Maidan Mahatma street Rukadi, kolhapur, maharashtra",
    "24B, Near Gandhi Maidan Mahatma street Rukadi, kolhapur, maharashtra",
    "24B, Near Gandhi Maidan Mahatma street Rukadi, kolhapur, maharashtra",
    "24B, Near Gandhi Maidan Mahatma street Rukadi, kolhapur, maharashtra",
  ];
  return (
    <>
      
      <div className="flex flex-col gap-5 overflow-auto h-full scrollbar-none">
      {locations.map((elem,idx) => {
        return (
          <div onClick={()=>{
            setVehiclePanel(true)
            setPanelOpen(false)
          }} key={idx} className="flex items-center border-2 border-gray-100 p-2 rounded-md active:border-gray-500 gap-4 justify-start">
            <p className="bg-gray-200 rounded-full p-2">
              {" "}
              <IoLocation size={20} />
            </p>
            <p>
              {elem}
            </p>
          </div>
        );
      })}
      </div>
    </>
  );
}

export default LocationSearchPanel;
