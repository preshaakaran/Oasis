import React, { useEffect, useState } from 'react';
import NNavbar from '../components/NNavbar';
import { useLocation } from 'react-router-dom';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import '../App.css'
import Del from '../assets/delete.png'
import Out from '../assets/SignOut.png'

const Guest = ({ cabins,url }) => {
    const location = useLocation();
    const user = useUser();
    const [ui, setUi] = useState("Home");
    const [reservations, setReservations] = useState([]);
    const [cabinIds, setCabinIds] = useState([]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/booking/list/${user.user.id}`);
            setReservations(response.data);
            setCabinIds(response.data.map(reservation => reservation.cabinId));
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:5000/api/booking/delete/${reservationId}`);
            fetchReservations();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleReserve = () => {
        setUi("Reservations");
        fetchReservations();
    };

    return (
        <div className='max-h-screen' style={{ backgroundColor: '#141c24' }}>
            <NNavbar />
            <div className="max-w-7xl mx-auto mt-10">
                <div className="flex h-[82.59vh] text-gray-100">

                    <nav className="w-64 p-4">
                        <div className="space-y-4">
                            <button onClick={() => setUi("Home")} className="flex p-4 items-center space-x-2 text-gray-400 hover:bg-gray-800 w-[10vw]">
                                <span>Home</span>
                            </button>
                            <button onClick={handleReserve} className="flex p-4 items-center space-x-2 text-gray-400 hover:bg-gray-800 w-[10vw]">
                                <span>Reservations</span>
                            </button>
                        </div>
                        <div className="absolute bottom-4 p-4">
                            
                            <a className="flex items-center space-x-2 text-gray-400 hover:text-white">
                                <img src={Out} alt="logo" className="w-6 h-6" /> <SignOutButton />
                            </a>
                        </div>
                    </nav>

                    <main className="flex-1 p-8 ">
                        {
                            ui === "Home" ? (
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={user.user.imageUrl} alt="cabins" className="w-[20vh] h-[20vh] rounded-full" />
                                    <h1 className="text-2xl font-semibold mb-6 mt-3">Welcome, {user.user.firstName} {user.user.lastName}</h1>
                                    <p className='text-2xl font-semibold mb-6'>Email: {user.user.emailAddresses[0].emailAddress}</p>
                                    <p className='text-2xl font-semibold mb-6'>Total Reservations: {reservations.length}</p>
                                </div>
                            ) : (
                                <div className='container mx-auto p-4'>
                                    <h1 className="text-3xl font-bold mb-6">Your Reservations</h1>
                                    <div className='h-[60vh] overflow-y-auto scrollbar-hidden'>
                                        {reservations.map((currentReservation, index) => {
                                            
                                            
                                            
                                            const cabin = cabins.find(cabin => cabin.id === Number(currentReservation.cabinId));

                                            

                                            return (
                                                cabin && currentReservation && (
                                                    <div className='flex border border-gray-500 w-full h-[18vh] mb-4 justify-between'>
                                                        <div className='flex'>
                                                            <img src={`${url}/images/${cabin.image}`} alt={cabin.name} className="w-32 h-[18vh] mr-4 object-cover" />
                                                            <div className='flex flex-col justify-between'>
                                                                <h1 className='text-2xl pl-2'>{currentReservation.numNights} nights in {cabin.name}</h1>
                                                                <h1 className='text-xl p-2'>{formatDate(currentReservation.startDate)} - {formatDate(currentReservation.endDate)}</h1>
                                                                <div className='flex justify-between w-full'>
                                                                    <div className='flex'>
                                                                        
                                                                        <h1 className='text-xl p-2 ' style={{ color: '#aa8153' }}>Total:${cabin.price * currentReservation.numNights + currentReservation.breakFastPrice}</h1>
                                                                        <li className='list-none text-xl p-2 ml-10'>For {cabin.capacity} guests</li>
                                                                    </div>
                                                                    <h1 className='text-xl pt-2 pb-2 ml-[25vh] pl-10'>{formatDate(currentReservation.currentDate)}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between items-center mr-6 pl-6 border-l border-zinc-500 flex-col pt-6 pb-6'>
                                                            <img src={Del} alt='delete' className='w-10 h-10' />
                                                        <div  onClick={() => handleDelete(currentReservation._id)}>
                                                            Delete
                                                        </div>
                                                        </div>
                                                    </div>
                                                )
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Guest;
