import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import NNavbar from '../components/NNavbar';
import Selected from '../components/Selected';
import DateSelector from '../components/DateSelector';
import Form from '../components/Form';


const CabinDetails = ({cabins,url}) => {
    const {id} = useParams();
    
    const location = useLocation();

  


  return (

    <div className="h-full" style={{backgroundColor: '#141c24'}}>
      <NNavbar />
      <div className='max-w-7xl mx-auto mt-10 p-10'>
        <div className='pr-10 pl-10'>
          <Selected cabins={cabins} id={id} url={url}/>
        </div>
        <div className='pr-10 pl-10'>
          <div className='flex items-center justify-center text-5xl font-bold' style={{ color: '#aa8153' }}>
            Reserve {cabins[id-1].name} today.Pay on arrival.
          </div>
          <div className=' flex items-center justify-center '>
            <DateSelector cabins={cabins} id={id} url={url}/>
            <Form cabins={cabins} id={id} />

          </div>
        </div>



      </div>
      

      
    </div>
  )
}

export default CabinDetails
