import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

function CaptainContext({children}) {
    const [isLoading,setIsLoading]=useState(false)
    const [error, setError] = useState(null)

  const [captain, setCaptain] = useState({
    email: "",
    password: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <CaptainDataContext.Provider value={{ captain, setCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
}

export default CaptainContext;
