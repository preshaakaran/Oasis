import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='absolute flex justify-around items-center w-full h-20 px-4 z-10'>
        <div className='flex items-center justify-between gap-8'>
            <img src={logo} alt="logo" className='w-[45px] h-[45px]'/>
            <h1 className='text-white text-2xl'>The Wild Oasis</h1>
        </div>
            
        
        <div className='flex items-center'>
            <ul className='flex items-center gap-12'>
                <li className='text-white text-xl'><Link to="/cabins">Cabins</Link></li>
                <li className='text-white text-xl'><Link to="/about">About</Link></li>
                <li className='text-white text-xl'><Link to="/guest">Guest Area</Link></li>
                <li className='text-white text-xl'><Link to="/signin">SignIn</Link></li>
            </ul>
        </div>
      
    </div>
  )
}

export default Navbar
