import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import CaptainLogin from "./Pages/CaptainLogin"
import CaptainSignup from "./Pages/CaptainSignup"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
      </Routes>
    </>
  )
}

export default App
