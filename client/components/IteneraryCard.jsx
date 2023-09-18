import React from 'react'


const IteneraryCard = ({iteneraryData, index, handleDeleteItenerary}) => {

  return (
    <div className='border border-black'>
      <h3> Itenerary {index + 1}</h3>
    <div>
    <h2> Hotels </h2>
    <p> {iteneraryData.hotel.name}</p>
    <p> Address: {iteneraryData.hotel.address}</p>
    </div>
    <div> 
      <h2> Attraction </h2>
      <p> {iteneraryData.attraction.name}</p>
      <p> Address: {iteneraryData.attraction.address}</p>
    </div>
    <div> 
      <h2> Restauraunt </h2>
      <p> {iteneraryData.restaurant.name}</p>
      <p> Address: {iteneraryData.restaurant.address}</p>
    </div>

    <button onClick={() => handleDeleteItenerary(iteneraryData.hotel.name)}> Remove </button>

    </div>
  )
}

export default IteneraryCard
