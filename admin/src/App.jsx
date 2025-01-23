import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Cabin from './pages/Cabin'
import CabinList from './pages/CabinList'

function App() {
 
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`

  return (
    <>
     <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<Booking url={url}/>} />
              
              <Route path="/cabin" element={<Cabin url={url} />} />
              <Route path="/cabinlist" element={<CabinList url={url} />} />
              
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
