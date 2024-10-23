import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/dist/style.css";
import {
    differenceInDays,
    isPast,
    isSameDay,
    isWithinInterval,
  } from "date-fns";
import { useReservation } from '../context/ReservationContext';
import '../components/DateSelector.css'




const DateSelector = ({cabins, id}) => {
    const {range,setRange,resetRange,hasBreakfast,setHasBreakfast} = useReservation();
   

    const breakfastPrice = hasBreakfast === "true" ? 200 : 0;
    const displayRange = `${range.from} - ${range.to}`

    const cabin = cabins.find((cabin) => cabin.id === id)
    const regularPrice = cabin.price;
    const discount = cabin.originalPrice - regularPrice;
    const numNights = differenceInDays(new Date(range.to), new Date(range.from));

    const [numberOfMonths, setNumberOfMonths] = useState(2);

    // Adjust number of months displayed based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNumberOfMonths(1); // Screen size below 'md'
      } else {
        setNumberOfMonths(2); // Screen size above 'md'
      }
    };

    handleResize(); // Set the initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
    

  return (
    <div>
    <div className=' '>
        <DayPicker
          className="place-self-center border border-gray-700 mt-10 p-4 text-gray-300 w-[45vw] h-[55vh]"
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          classNames={{
              months:"grid grid-cols-2 gap-4",
              selected: "bg-gray-700",
              range_start:"bg-gray-700",
              range_end:"bg-gray-700",
              
            
          }}
          
          
        />
        


<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between lg:gap-0  lg:h-[72px] py-2 lg:py-0 w-[45vw] rounded-b" style={{backgroundColor:'#aa8153'}}>
        <div className="flex items-baseline p-2 font-bold">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights ? (
            <p className="bg-accent-600 px-3 py-2 text-2xl">
              <span>&times;</span> <span>{numNights}</span>
            </p>
          ) : null}
        </div>
        <div className="flex justify-center items-center gap-3">
          {numNights ? (
            <>
              <p>
                <span className="text-lg font-bold uppercase">Total:</span>{" "}
                <span className="text-2xl font-semibold">
                  ${regularPrice*numNights + breakfastPrice}
                </span>
              </p>
            </>
          ) : null}
          {range.from || range.to ? (
            <button
              className="underline py-2 px-4 text-sm font-semibold"
              onClick={resetRange}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
    </div>
  )
}

export default DateSelector
