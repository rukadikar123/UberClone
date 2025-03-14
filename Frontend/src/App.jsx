import { Route, Routes } from "react-router-dom"
import Start from "./Pages/Start"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import CaptainLogin from "./Pages/CaptainLogin"
import CaptainSignup from "./Pages/CaptainSignup"
import Home from "./Pages/Home"
import UserProtectWrapper from "./Pages/UserProtectWrapper"
import UserLogout from "./Pages/UserLogout"
import CaptainHome from "./Pages/CaptainHome"
import CaptainProtectWrapper from "./Pages/CaptainProtectWrapper"
import CaptainLogout from "./Pages/CaptainLogout"


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
        <Route path="/user/logout" element={<UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>}/>
        <Route path="/captain-home" element={<CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>}  />
        <Route path="/captain-logout" element={<CaptainProtectWrapper>
          <CaptainLogout/>
        </CaptainProtectWrapper>}  />
        
      </Routes>
    </>
  )
}

export default App
