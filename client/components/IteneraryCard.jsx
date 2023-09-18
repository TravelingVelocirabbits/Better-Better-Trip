import React from 'react'
import { GrFormClose } from 'react-icons/gr';



const IteneraryCard = ({iteneraryData, index, handleDeleteItenerary}) => {

  return (
    <div className='first-line:mt-3 mb-3' > 
        <h1 className='text-black text-2xl font-extrabold bg-gray-100 p-5 rounded-lg shadow-md text-center'> Itinerary {index + 1}</h1>

    <div className='flex justify-center space-x-8 my-8 h-1/5' >

    <div className="w-1/3 border border-gray-300 rounded-lg shadow-lg p-6 m-2 transition-transform duration-300 hover:scale-110">
    <h2 className='text-lg font-semibold mb-4'>Hotels</h2> 
    <img className="w-full h-44 object-cover rounded-sm mb-4" src={iteneraryData.hotel.photo} alt="Hotel"/> 
    <p className="text-base font-medium mb-2">{iteneraryData.hotel.name}</p> 
    <p className="text-sm text-gray-600 mb-1">Address: {iteneraryData.hotel.address}</p>
    <p className="text-sm text-gray-600">Rating: {iteneraryData.hotel.rating}</p>
  </div>

  <div className="w-1/3 border border-gray-300 rounded-lg shadow-lg p-6 m-2 transition-transform duration-300 hover:scale-110">
    <h2 className='text-lg font-semibold mb-4'>Attraction</h2> 
    <img className="w-full h-44 object-cover rounded-sm mb-4" src={iteneraryData.attraction.photo} alt="Attraction"/> 
    <p className="text-base font-medium mb-2">{iteneraryData.attraction.name}</p> 
    <p className="text-sm text-gray-600 mb-1">Address: {iteneraryData.attraction.address}</p>
    <p className="text-sm text-gray-600">Rating: {iteneraryData.attraction.rating}</p>
  </div>

  <div className="w-1/3 border border-gray-300 rounded-lg shadow-lg p-6 m-2 transition-transform duration-300 hover:scale-110">
  <h2 className='text-lg font-semibold mb-4'> Restaurant </h2> 
  <img className="w-full h-44 object-cover rounded-sm mb-4" src={iteneraryData.restaurant.photo} alt="Restaurant"/> 
    <p className="text-base font-medium mb-2">{iteneraryData.restaurant.name}</p> 
    <p className="text-sm text-gray-600 mb-1">Address: {iteneraryData.restaurant.address}</p> 
    <p className="text-sm text-gray-600">Rating: {iteneraryData.restaurant.rating}</p>
  </div>

    <div className='mr-3.5'> 
    <button 
      style={{
        width: '50px', 
        height: '50px', 
        backgroundColor: 'transparent', 
        color: 'black', 
        border: 'none',
        fontSize: '24px',
        lineHeight: '24px',
        cursor: 'pointer'
      }}
      onClick={() => handleDeleteItenerary(iteneraryData.hotel.name)} >&times; 
      </button>
    </div>



      
    </div>
    
    </div>
  )
}

export default IteneraryCard
