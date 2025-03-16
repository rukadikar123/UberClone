import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowDown } from "react-icons/md";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Vehiclepanel from "../components/Vehiclepanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef=useRef(null)
  const WaitingForDriverRef=useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60vh",
          padding: "10px",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0vh",
          padding: "0",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(-10%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(-5%)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(-5%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (WaitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(-5%)",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [WaitingForDriver]
  );


  return (
    <>
      <div className="flex w-full h-screen  gap-10 p-10 justify-between overflow-hidden">
        <div className="mt-10 relative ml-10 w-[40%] ">
          <div className="flex items-center gap-40">
            <h1 className="text-3xl font-semibold">Find a trip</h1>
            <p
              className="opacity-0"
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
            >
              <MdKeyboardArrowDown size={35} />
            </p>
          </div>
          <div className="w-[90%]">
            <form
              onSubmit={(e) => submitHandler(e)}
              className="flex flex-col gap-4 mt-6"
            >
              <div className="line w-1 h-[50px] bg-gray-700 rounded-full absolute top-20 left-6"></div>
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
            <div ref={panelRef} className="h-0 mt-6 overflow-hidden p-0">
              <LocationSearchPanel
                setVehiclePanel={setVehiclePanel}
                setPanelOpen={setPanelOpen}
              />
            </div>
          </div>
          <div
            ref={vehiclePanelRef}
            className="fixed bottom-0 w-[32vw] ml-1 mt-2 h-[60vh]  bg-white overflow-auto scrollbar-none translate-y-full "
          >
            <Vehiclepanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
          </div>
        </div>
        <div
            ref={confirmRidePanelRef}
            className="fixed bottom-0 w-[34vw] ml-10 mt-1 h-[64vh] bg-white overflow-auto scrollbar-none translate-y-full "
          >
            <ConfirmRidePanel setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
          </div>
          <div
            ref={vehicleFoundRef}
            className="fixed bottom-0 w-[34vw] ml-10 mt-1 h-[64vh] bg-white overflow-auto scrollbar-none translate-y-full "
          >
            <LookingForDriver setVehicleFound={setVehicleFound}/>
          </div>
          <div
            ref={WaitingForDriverRef}
            className="fixed bottom-0 w-[34vw] ml-10 mt-1 h-[64vh] bg-white overflow-auto scrollbar-none translate-y-full "
          >
            <WaitForDriver setWaitingForDriver={setWaitingForDriver}/>
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
