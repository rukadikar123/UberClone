import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Vehiclepanel from "../components/Vehiclepanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import { UserDataContext } from "../Context/userContext";
import { SocketContext } from "../Context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType]=useState(null)
  const [ride, setRide]=useState(null)


  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

 const {socket}=useContext(SocketContext)
 const {user}=useContext(UserDataContext)

 const navigate=useNavigate()

 useEffect(() => {

   socket.emit('join',{userType:'user', userId:user._id})
  
 }, [user])

 socket.on('ride-confirm', ride=>{
  setRide(ride)
  setVehicleFound(false)
  setWaitingForDriver(true)
 })

 socket.on('ride-started', ride=>{
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } })
 })
 

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchSuggestions = async (query, field) => {
    if (query.trim() === "") {
      if (field === "pickup") {
        setPickupSuggestions([]);
      } else if (field === "destination") {
        setDestinationSuggestions([]);
      }
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Extract suggestions from response (change this line as needed based on API response)
      const suggestions = response?.data?.suggestions;
      console.log(suggestions);

      if (field === "pickup") {
        setPickupSuggestions(suggestions);
      } else if (field === "destination") {
        setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    fetchSuggestions(value, "pickup");
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchSuggestions(value, "destination");
  };

  const onSelectSuggestion = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion?.description);
      setPickupSuggestions([]);
    } else if (activeField === "destination") {
      setDestination(suggestion?.description);
      setDestinationSuggestions([]);
    }
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

  async function findTrip() {
    try {
      // Close previous panels and open vehicle panel
      setPanelOpen(false);
      setVehiclePanel(true);

      // Make API call using Axios
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Log response data for debugging
      setFare(response?.data);
      // console.log("API Response:", response?.data);
    } catch (error) {
      // Handle errors effectively
      console.error(
        "Error fetching fare:",
        error?.response?.data?.message || error.message
      );
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
    
  }

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
                onChange={handlePickupChange}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                type="text"
                placeholder="Add a Pick-up location"
              />
              <input
                className="w-1/2 text-center bg-[#eee] text-sm px-3 py-2 rounded-lg outline-none"
                value={destination}
                onChange={handleDestinationChange}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                type="text"
                placeholder="Add your Destination"
              />
            </form>
            <button
              onClick={findTrip}
              className="mt-7 ml-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-black/70 transition duration-300"
            >
              Find Trip
            </button>
            <div ref={panelRef} className="h-0 mt-6 overflow-hidden p-0">
              <LocationSearchPanel
                suggestions={
                  activeField === "pickup"
                    ? pickupSuggestions
                    : destinationSuggestions
                }
                onSelectSuggestion={onSelectSuggestion}
                setVehiclePanel={setVehiclePanel}
                setPanelOpen={setPanelOpen}
              />
            </div>
          </div>
          <div
            ref={vehiclePanelRef}
            className="fixed bottom-0 w-[32vw] ml-1 mt-2 h-[60vh] bg-white overflow-auto scrollbar-none translate-y-full "
          >
            <Vehiclepanel
              fare={fare}
              selectVehicle={setVehicleType}
              setVehiclePanel={setVehiclePanel}
              setConfirmRidePanel={setConfirmRidePanel}
            />
          </div>
        </div>
        <div
          ref={confirmRidePanelRef}
          className="fixed bottom-0 w-[34vw] ml-10 mt-1 h-[64vh] bg-white overflow-auto scrollbar-none translate-y-full "
        >
          <ConfirmRidePanel
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="fixed bottom-0 w-[34vw] ml-10 mt-1 h-[64vh] bg-white overflow-auto scrollbar-none translate-y-full "
        >
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
        </div>
        <div
          ref={WaitingForDriverRef}
          className="fixed bottom-0 w-[34vw] ml-10 mt-1 h-[64vh] bg-white overflow-auto scrollbar-none translate-y-full "
        >
          <WaitForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} />
        </div>

        <div className="h-full  w-[60%]">
         <LiveTracking/>
        </div>
      </div>
    </>
  );
}

export default Home;
