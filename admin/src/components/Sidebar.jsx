import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Sidebar = () => {
    return (
      <div className="w-[25vw] h-[100vh] p-6 border-r border-gray-500 bg-gray-800">
        <div className="flex items-center mb-10 flex-col">
          <div className="w-[20vh] h-[20vh] m-4 bg-primary rounded-full mr-3">
            <img src={logo} alt="logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-white">The Wild Oasis</h1>
        </div>
        <nav>
          <ul>
            <li className="text-lg text-gray-300 mb-4">
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300">
                Home
              </Link>
            </li>
            <li className="text-lg text-gray-300 mb-4">
              <Link to="/booking" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300">
                Bookings
              </Link>
            </li>
            <li className="text-lg text-gray-300 mb-4">
              <Link to="/cabin" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300">
                Upload
              </Link>
            </li>
            <li className="text-lg text-gray-300 mb-4">
              <Link to="/cabinlist" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300">
                List
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
