
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

import About from './pages/About'
import Cabins from './pages/Cabins'
import Guest from './pages/Guest'
import CabinDetails from './pages/CabinDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { SignIn, SignUp } from '@clerk/clerk-react'
// import Art from '../src/assets/cabins/Art Deco Delight.png'
// import Beachside from '../src/assets/cabins/Beachside Bungalow.png'
// import Cozy from '../src/assets/cabins/Cozy Nook.png'
// import Gothic from '../src/assets/cabins/Gothic.png'
// import Modern from '../src/assets/cabins/Modern.png'
// import Mountain from '../src/assets/cabins/Mountain Lodge.png'
// import Parisian from '../src/assets/cabins/Parisian Chic.png'
// import Rustic from '../src/assets/cabins/Rustic Chic.png'
// import { useEffect } from 'react'
import Confirmation from './components/Confirmation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'





function App() {
  const url=`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`

  const [cabins, setCabins] = useState([]);

  const fetchCabinList = async () => {
    try {
        const response = await axios.get(`${url}/api/cabins/list`);
        if (response.data) {
            setCabins(response.data);
            console.log(response.data);
        } 
    } catch (error) {
        toast.error("An error occurred while fetching cabins.");
    }
  };

  useEffect(() => {
    fetchCabinList();
  }, []);

  


  



  

  // const cabins = [
  //   { 
  //     id: '1', 
  //     name: 'Cabin 001', 
  //     capacity: 2, 
  //     price: 250, 
  //     image: Art, 
  //     description: 'A cozy retreat nestled in the woods, perfect for a romantic getaway. Enjoy the serene nature around you, with a beautiful view of the surrounding trees and wildlife. Relax on the porch with a cup of coffee as the sun rises. In the evening, unwind by the fire pit under a starlit sky.' 
  //   },
  //   { 
  //     id: '2', 
  //     name: 'Cabin 002', 
  //     capacity: 2, 
  //     price: 325, 
  //     originalPrice: 350, 
  //     image: Beachside, 
  //     description: 'Nestled right by the beach, this charming cabin offers stunning ocean views and easy access to the shoreline. Spend your days sunbathing, swimming, or exploring nearby coastal trails. In the evenings, enjoy a sunset barbecue on the deck. Listen to the soothing sound of waves as you drift off to sleep.' 
  //   },
  //   { 
  //     id: '3', 
  //     name: 'Cabin 003', 
  //     capacity: 4, 
  //     price: 300, 
  //     image: Cozy, 
  //     description: 'A charming cabin with rustic decor, providing a warm and inviting atmosphere for families. The spacious living area is perfect for game nights, and the fully equipped kitchen makes cooking a breeze. Enjoy the beautiful surroundings and nearby hiking trails. Create lasting memories as you gather around the dining table for meals together.' 
  //   },
  //   { 
  //     id: '4', 
  //     name: 'Cabin 004', 
  //     capacity: 4, 
  //     price: 450, 
  //     originalPrice: 500, 
  //     image: Gothic, 
  //     description: 'This unique gothic-style cabin offers a blend of elegance and comfort in a magical setting. With intricate architectural details and modern amenities, it’s an enchanting getaway. Enjoy the expansive gardens and nearby attractions for a delightful stay. Experience the charm of evenings spent reading in the cozy nook by the window.' 
  //   },
  //   { 
  //     id: '5', 
  //     name: 'Cabin 005', 
  //     capacity: 6, 
  //     price: 350, 
  //     image: Modern, 
  //     description: 'A modern cabin featuring sleek design and high-end amenities for a luxurious stay. Experience the perfect combination of comfort and style with large windows that let in plenty of natural light. Ideal for families or groups looking for a chic retreat. Host fun gatherings in the open-concept living space that seamlessly connects indoor and outdoor living.' 
  //   },
  //   { 
  //     id: '6', 
  //     name: 'Cabin 006', 
  //     capacity: 6, 
  //     price: 700, 
  //     originalPrice: 800, 
  //     image: Mountain, 
  //     description: 'Surrounded by majestic mountains, this cabin is perfect for outdoor enthusiasts and adventurers. Enjoy easy access to hiking and skiing trails, or simply relax on the spacious deck and take in the breathtaking views. It’s a nature lover’s paradise. After a day of adventure, enjoy a soak in the hot tub as the sun sets behind the peaks.' 
  //   },
  //   { 
  //     id: '7', 
  //     name: 'Cabin 007', 
  //     capacity: 8, 
  //     price: 500, 
  //     originalPrice: 600, 
  //     image: Parisian, 
  //     description: 'Experience a touch of Paris with this beautifully decorated cabin, complete with elegant furnishings and a cozy atmosphere. Perfect for family gatherings, this cabin is equipped with everything you need for a comfortable stay, including a large dining area and outdoor space. Enjoy leisurely breakfasts on the patio, surrounded by the lush gardens.' 
  //   },
  //   { 
  //     id: '8', 
  //     name: 'Cabin 008', 
  //     capacity: 10, 
  //     price: 1400, 
  //     image: Rustic, 
  //     description: 'A spacious rustic cabin that accommodates large groups, perfect for family reunions and retreats. Enjoy communal spaces for dining and relaxation, as well as individual nooks for quiet moments. The stunning views and cozy fire pit make for unforgettable memories. With ample outdoor space, engage in fun activities like games and storytelling around the fire.' 
  //   },
  // ];
  
  

  

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          
          <Route path='/cabins' element={<ProtectedRoute><Cabins cabins={cabins} url={url}/></ProtectedRoute>} />
          <Route path='/about' element={<ProtectedRoute><About  /></ProtectedRoute>} />
          <Route path='/guest' element={<ProtectedRoute><Guest cabins={cabins} url={url}/></ProtectedRoute>}/>
          <Route path='/cabins/:id' element={<ProtectedRoute><CabinDetails cabins={cabins} url={url}/></ProtectedRoute>} />
          <Route path='/confirmation' element={<Confirmation />} />
          
        </Routes>
      </BrowserRouter>


      
    </>
  )
}

export default App
