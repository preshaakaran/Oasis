import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NNavbar from '../components/NNavbar'

import CabinCard from '../components/CabinCard'






export default function Cabins({cabins,url}) {


  
  return (
    <div className="min-h-screen" style={{backgroundColor: '#141c24'}}>
      <NNavbar />
      
      <div className="max-w-7xl mx-auto mt-10 p-3">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium" style={{ color: '#aa8153' }}>
        Our Luxury Cabins
      </h1>
      <p className="text-gray-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
        
        <CabinCard cabins={cabins} url={url}/>
        
      </div>
    </div>
  )
}
