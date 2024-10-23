import React, { useEffect } from 'react'
import NNavbar from '../components/NNavbar';
import { useLocation } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';

const Guest = () => {

    const location = useLocation();
 
    


  return (
    <div className='' style={{backgroundColor: '#141c24'}}>
        <NNavbar />
        <div className="max-w-7xl mx-auto mt-10">
        <div className="flex h-screen text-gray-100">
      {/* Sidebar */}
      <nav className="w-64 p-4">
        <div className="space-y-4">
          <a href="#" className="flex p-4 items-center space-x-2 text-gray-400 hover:bg-gray-800">
            {/* <Home className="h-5 w-5" /> */}
            <span>Home</span>
          </a>
          <a href="#" className="flex p-4 items-center space-x-2 text-gray-400 hover:bg-gray-800">
            {/* <Calendar className="h-5 w-5" /> */}
            <span>Reservations</span>
          </a>
          <a href="#" className="flex p-4 items-center space-x-2 text-gray-400 hover:bg-gray-800">
            {/* <User className="h-5 w-5" /> */}
            <span>Guest profile</span>
          </a>
        </div>
        <div className="absolute bottom-4 p-4">
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <SignOutButton />
      
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Welcome, Aleksandar</h1>
        <h2 className="text-xl mb-4">Unpaid Reservations</h2>

    
        
      </main>
    </div>
    </div>
      
    </div>
  )
}

export default Guest;
