import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import { Navigator } from "./assets/components/Navigator"
import { Home } from "./assets/components/home"
import { Agent } from "./assets/components/Agent"
import { Module } from "./assets/components/Module"
import { User } from "./assets/components/User"
import { Sigin } from "./assets/components/Signin"
import { PropsContext } from "./assets/components/context/PropsContext"

function App() {

  return (
    <>
    <PropsContext>
      <BrowserRouter>
          <Navigator/>
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/agent" element={<Agent/>}></Route>
              <Route path="/module" element={<Module/>}></Route>
              <Route path="/user" element={<User/>}></Route>
              <Route path="/signin" element={<Sigin/>}></Route>
          </Routes>
      </BrowserRouter>
     </PropsContext> 
    </>
  )
}

export default App
