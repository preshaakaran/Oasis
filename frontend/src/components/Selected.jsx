import React from 'react'
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import TextExpander from './TextExpander';

const Selected = ({cabins,id,url}) => {

    console.log(cabins)
    const cabin = cabins.filter(cabin => cabin.id == id)[0]
    console.log(cabin)
    
  return (
    <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[3fr_4fr] gap-2 md:gap-20 border border-primary-800 py-3 px-6 md:px-10 mb-12 md:mb-24">

      <div className="relative scale-100 md:scale-[1.15] -translate-x-0 md:-translate-x-3 mb-6 md:mb-0">
        <img
          src={`${url}/images/${cabin.image}`}
          alt={`${cabin.name}`}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text Section */}
      <div>
        <h3 className="text-gray-300  font-black text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-5 translate-x-[-10%] md:translate-x-[-254px] bg-primary-950 p-4 md:p-6 pb-1 w-[110%] md:w-[150%]">
            <span className='bg-black pr-2 pl-2'>
            {cabin.name}
            </span>
        </h3>

        <p className="text-gray-400 md:text-lg text-primary-300 mb-6 md:mb-10">
          <TextExpander>{cabin.description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-2 md:gap-4 mb-5 md:mb-7">
          <li className="flex gap-2 md:gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-gray-300" />
            <span className="text-gray-400 md:text-lg">
              For up to <span className="font-bold">{cabin.capacity}</span> guests
            </span>
          </li>
          <li className="flex gap-2 md:gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-gray-300" />
            <span className="text-gray-400 md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold text-gray-400">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-2 md:gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-gray-300" />
            <span className="text-gray-400 md:text-lg">
              Privacy <span className="font-bold text-gray-400">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Selected
