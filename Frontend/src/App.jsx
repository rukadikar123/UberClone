import { Route, Routes } from "react-router-dom"
import Start from "./Pages/Start"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import CaptainLogin from "./Pages/CaptainLogin"
import CaptainSignup from "./Pages/CaptainSignup"
import Home from "./Pages/Home"
import UserProtectWrapper from "./Pages/UserProtectWrapper"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
      </Routes>
    </>
  )
}

export default App
