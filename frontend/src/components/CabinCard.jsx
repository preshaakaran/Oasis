import React from 'react';
import { Link } from 'react-router-dom';

const CabinCard = ({ cabins }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
        {cabins.map((cabin) => (
          <div key={cabin.id} className="border border-gray-500 overflow-hidden flex flex-col h-full">
            <div className="relative w-full h-48 md:h-56 lg:h-64">
              <img
                src={cabin.image}
                alt={cabin.name}
                className="object-cover w-full h-full border-b border-gray-500"
              />
            </div>
            <div className="flex-grow p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: '#aa8153' }}>
                  {cabin.name}
                </h2>
                <p className="text-sm text-gray-400 mb-2">For up to {cabin.capacity} guests</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-300">${cabin.price}</p>
                  {cabin.originalPrice && (
                    <p className="text-sm text-gray-400 line-through ml-2">${cabin.originalPrice}</p>
                  )}
                  <p className="text-sm text-gray-400">/ night</p>
                </div>
                <Link
                  to={`/cabins/${cabin.id}`}
                  className="text-center text-gray-300 border-l border-gray-500 pl-4 transition hover:text-white"
                >
                  Details & reservation →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CabinCard;
