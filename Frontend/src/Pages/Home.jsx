import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowDown } from "react-icons/md";
import LocationSearchPanel from "../components/LocationSearchPanel";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef=useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60vh",
          padding:'20px'
        });
        gsap.to(panelCloseRef.current,{
          opacity:1
        })
      } else {
        gsap.to(panelRef.current, {
          height: "0vh",
          padding:'0'
        });
        gsap.to(panelCloseRef.current,{
          opacity:0
        })
      }
    },
    [panelOpen]
  );

  return (
    <>
      <div className="flex w-full h-screen  gap-10 p-10 justify-between">
        <div className="mt-10 ml-10 w-[40%] ">
          <div className="flex items-center gap-40">
            <h1 className="text-3xl font-semibold">Find a trip</h1>
            <p className="opacity-0" ref={panelCloseRef} onClick={()=>setPanelOpen(false)}>
              <MdKeyboardArrowDown size={35} />
            </p>
          </div>
          <div className="w-[90%]">
            <form
              onSubmit={(e) => submitHandler(e)}
              className="flex flex-col gap-4 mt-6"
            >
              <div className="line w-1 h-[50px] bg-gray-700 rounded-full absolute top-39 left-24"></div>
              <input
                className="w-1/2 text-center bg-[#eee] text-sm py-2 px-3 rounded-lg outline-none"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onClick={() => setPanelOpen(true)}
                type="text"
                placeholder="Add a Pick-up location"
              />
              <input
                className="w-1/2 text-center bg-[#eee] text-sm px-3 py-2 rounded-lg outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onClick={() => setPanelOpen(true)}
                type="text"
                placeholder="Add your Destination"
              />
            </form>
            <div ref={panelRef} className="h-0 bg-amber-100 mt-6 overflow-hidden p-0">
              <LocationSearchPanel/>
            </div>
          </div>
        </div>
        <div className="h-full  w-[60%]">
          <img
            className="h-full object-cover rounded-2xl"
            src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Home;
