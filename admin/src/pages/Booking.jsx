import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import Del from '../assets/delete.png';

const Booking = ({ url }) => {
    const [reservations, setReservations] = useState([]);
    const [cabinList, setCabinList] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/booking/list`);
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
            toast.error("Error fetching reservations.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/booking/delete/${reservationId}`);
            fetchReservations();
            toast.success("Reservation deleted successfully.");
        } catch (error) {
            console.error("Error deleting reservation:", error);
            toast.error("Error deleting reservation.");
        }
    };

    useEffect(() => {
        fetchCabinList();
        fetchReservations();
    }, [url]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className='flex text-white h-[100vh] w-[100vw]' style={{ backgroundColor: '#141c24' }}>
            <Sidebar />
            <div className='w-[75vw] p-5'>
                <div className="max-w-7xl mx-auto mt-10">
                    <div className="flex h-[82.59vh] text-gray-100">
                        <main className="flex-1 p-8">
                            <div className='container mx-auto p-4'>
                                <h1 className="text-3xl font-bold mb-6">Bookings</h1>
                                <div className='h-[60vh] overflow-y-auto scrollbar-hidden'>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        reservations.map((currentReservation) => {
                                            const cabin = cabinList.find(cabin => cabin.id === Number(currentReservation.cabinId));
                                            
                                            return (
                                                cabin && (
                                                    <div key={currentReservation._id} className='flex border border-gray-500 w-full h-[18vh] mb-4 justify-between'>
                                                        <div className='flex'>
                                                            <img src={`${url}/images/${cabin.image}`} alt={cabin.name} className="w-32 h-[18vh] mr-4 object-cover" />
                                                            <div className='flex flex-col justify-between'>
                                                                <div className='flex justify-between'>
                                                                    <h1 className='text-2xl pl-2'>{currentReservation.numNights} nights in {cabin.name}</h1>
                                                                    <h1 className='text-2xl pl-2 text-gray-500 '>{currentReservation.userEmail}</h1>
                                                                </div>
                                                                <h1 className='text-xl p-2'>{formatDate(currentReservation.startDate)} - {formatDate(currentReservation.endDate)}</h1>
                                                                <div className='flex justify-between w-full'>
                                                                    <div className='flex'>
                                                                        <h1 className='text-xl p-2 ' style={{ color: '#aa8153' }}>Total: ${cabin.price * currentReservation.numNights + currentReservation.breakFastPrice}</h1>
                                                                        <li className='list-none text-xl p-2 ml-10'>For {cabin.capacity} guests</li>
                                                                    </div>
                                                                    <h1 className='text-xl pt-2 pb-2 ml-[25vh] pl-10'>{formatDate(currentReservation.currentDate)}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between items-center mr-6 pl-6 border-l border-zinc-500 flex-col pt-6 pb-6'>
                                                            <img src={Del} alt='delete' className='w-10 h-10 cursor-pointer' onClick={() => handleDelete(currentReservation._id)} />
                                                            <div className='text-gray-500 cursor-pointer' onClick={() => handleDelete(currentReservation._id)}>Delete</div>
                                                        </div>
                                                    </div>
                                                )
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
