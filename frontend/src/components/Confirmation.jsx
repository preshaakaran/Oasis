import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import anim from '../assets/Animation.gif';
import { se } from 'date-fns/locale';


const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionDetails, setSessionDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/booking/session/${sessionId}`);
        console.log(response.data);
        setSessionDetails(response.data);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setError(error.response ? error.response.data.message : "An unexpected error occurred.");
      }
    };

    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  if (error) {
    return <div>Error fetching session details: {error}</div>;
  }

  if (!sessionDetails) {
    return <div>Loading...</div>;
  }

  setTimeout(()=>
  {
    window.location.replace("http://localhost:5173/");
  },6000);



  return (
    <div className="confirmation-container flex flex-col items-center justify-center min-h-screen" style={{backgroundColor: '#141c24'}} >
        
        
      <h1 className="text-2xl font-bold text-gray-300">Booking Confirm</h1>
      <img src={anim} alt="Animation" className="w-[20vh] h-[20vh]"/>
      <p className="mt-4 text-gray-400">Thank you for your booking!</p>

     
        
        <p className="mt-2 text-gray-400"><strong>Session ID:</strong> {sessionDetails.id}</p>
      

      
    </div>
  );
};

export default Confirmation;
