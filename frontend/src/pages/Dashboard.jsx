import React from 'react'

import bg from '../assets/bg.png'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className=''>
        
      <div className="relative">
      <Navbar />
      <img
        src={bg}
        alt="Mountains and forests with two cabins"
        fill
        quality={80}
        placeholder="blur"
        className="w-[100vw] h-[100vh]"
      />

      <div className="absolute text-center top-[-40px]  flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-5xl sm:text-8xl text-primary-50 mb-10 tracking-tight font-normal break-all text-white">
          Welcome to paradise.
        </h1>
        <button className="pt-3 pb-3" style={{ backgroundColor: '#c69963'}}>
        <Link
          to="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
        </button>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
