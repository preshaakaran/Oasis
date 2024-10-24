import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const CabinList = ({ url }) => {
    const [cabinList, setCabinList] = useState([]);

    const fetchCabinList = async () => {
        try {
            const response = await axios.get(`${url}/api/cabins/list`);
            if (response.data) {
                setCabinList(response.data);
            } 
        } catch (error) {
            toast.error("An error occurred while fetching cabins.");
        }
    };

    const removeCabin = async (cabinId) => {
        try {
            const response = await axios.delete(`${url}/api/cabins/delete/${cabinId}`);
            if (response.data) {
                toast.success(response.data);
                fetchCabinList(); 
            } 
        } catch (error) {
            toast.error("An error occurred while removing cabin.");
        }
    };

    useEffect(() => {
        fetchCabinList();
    }, []);

    return (
        <div className='flex text-white h-screen w-screen' style={{ backgroundColor: '#141c24' }}>
            <Sidebar />
            <div className='w-3/4 p-5'>
                <div className='flex flex-col'>
                    <h2 className='text-2xl mb-4 font-bold'>All Cabins List</h2>
                    <div className="overflow-x-auto">
                        <div className="min-w-full bg-gray-800 rounded-lg shadow-md">
                            <div className="grid grid-cols-5 text-center bg-gray-700 text-white font-bold">
                                <div className="p-4">Image</div>
                                <div className="p-4">Name</div>
                                <div className="p-4">Capacity</div>
                                <div className="p-4">Price</div>
                                <div className="p-4">Action</div>
                            </div>
                            {cabinList.map((cabin, index) => (
                                <div key={index} className='grid grid-cols-5 text-center border-b border-gray-600'>
                                    <img src={`${url}/images/${cabin.image}`} alt={cabin.name} className="w-24 h-16 object-cover mx-auto" />
                                    <p className="p-4">{cabin.name}</p>
                                    <p className="p-4">{cabin.capacity}</p>
                                    <p className="p-4">${cabin.price}</p>
                                    <p 
                                        onClick={() => removeCabin(cabin._id)} 
                                        className='p-4 text-red-500 cursor-pointer hover:text-red-700'
                                    >
                                        X
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinList;
