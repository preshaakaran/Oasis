import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useReservation } from '../context/ReservationContext';
import { differenceInDays } from 'date-fns'
import { el, gu } from 'date-fns/locale';
import axios from 'axios';


const Form = ({cabins,id}) => {
    const url = "http://localhost:5000";
    const user = useUser();
    const { range,setRange,resetRange,hasBreakfast,setHasBreakfast} = useReservation();

    const cabin = cabins.filter(cabin => cabin.id == id)[0]
    const regularPrice = cabin.price
    const discount = cabin.originalPrice - regularPrice

    const maxCapacity = cabin.capacity


    const startDate = range.from;
  const endDate = range.to; 
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (cabin.price );

    const bookingData = {
        userId: user.user.id,
        userEmail: user.user.emailAddresses[0].emailAddress,
        startDate,
        endDate,
        numNights,
        cabinPrice,
        breakFastPrice: hasBreakfast === "true" ? 200 : 0,
        cabinId: id,
        currentDate: new Date(),
      };

      
    





    const placeOrder = async(event) => {
        event.preventDefault();
        let response = await axios.post(url+"/api/booking/place", bookingData);
        if(response.data.success){
            const {session_url}=response.data;
            window.location.replace(session_url) 
        }else{
            alert("Error placing order")
        }

        
        
      
        
    }

  return (
    <div>
        <div className="scale-[1.01] mt-[2.5rem] bg-gray-900 text-gray-300 ">
      <div className="bg-gray-800 text-gray-300 px-8 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-2 items-center">
          <img
           
            width={32}
            height={32}

            className="h-8 rounded-full z-50"
            src={user.user.imageUrl}
            alt={user.user.firstName}
          />
          <p>{user.user.firstName} {user.user.lastName}</p>

          
        </div>
      </div>

      <form
        className="bg-gray-900 py-1 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
        
          resetRange();
        }}
        onSubmit={placeOrder}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-1 bg-gray-200 text-gray-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="hasBreakfast">
            Want Breakfast? (included in total price)
          </label>
          <select
            name="hasBreakfast"
            id="hasBreakfast"
            className="px-5 py-1 bg-gray-200 text-gray-800 w-full shadow-sm rounded-sm"
            required
            value={hasBreakfast}
            onChange={(e) => {
              setHasBreakfast(e.target.value);
            }}
          >
            <option value={false} key="no">
              No
            </option>
            <option value={true} key="yes">
              Yes
            </option>
          </select>
        </div>
        <div className="space-y-2 ">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-1 bg-gray-200 text-gray-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6 pb-2">
          {!(startDate && endDate) ? (
            <p className="text-gray-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <button type='submit'>
              Reserve now
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  )
}

export default Form
