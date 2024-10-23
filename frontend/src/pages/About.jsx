import React, { useEffect } from 'react'

import image1 from '../assets/about-1.jpg'
import image2 from '../assets/about-2.jpg'
import NNavbar from '../components/NNavbar'
import { Link, useLocation } from 'react-router-dom'

const About = () => {

  const location = useLocation();



  return (
    <div className="h-full" style={{backgroundColor: '#141c24'}}>

        <NNavbar />
   
        <div className='pr-10 pl-10 pb-10 mr-10 ml-10 mt-10'>
        <div className="grid grid-cols-5 gap-x-12 sm:gap-x-24 gap-y-20 sm:gap-y-32 text-lg items-center ">
      <div className="col-span-5 md:col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium" style={{ color: '#aa8153' }}>
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8 text-gray-200">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our  luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>


      <div className="col-span-5 md:col-span-2">
        <img
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="col-span-5 md:col-span-3 order-1 md:order-none">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium"  style={{ color: '#aa8153' }}>
          Managed by our family since 1962
        </h1>

        <div className="space-y-8 text-gray-200">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
          <button className="pt-3 pb-3" style={{ backgroundColor: '#c69963'}}>
        <Link
          to="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all text-black"
        >
          Explore our luxury cabins
        </Link>
        </button>
            
          </div>
        </div>
      </div>

      <div className="col-span-5 md:col-span-2 order-2 md:order-none">
        <img
          src={image2}
          alt="Family that manages The Wild Oasis"
          placeholder="blur"
          quality={80}
        />
      </div>
    </div>
        </div>
      
    </div>
  )
}

export default About
