import React from 'react'



const MyItineraryCards = ({renderItinerary}) => {

    // console.log("Did this data come in", renderItinerary)
    // console.log("Did this data come in hotel", renderItinerary[0].hotel.name)

  return (
    <div className='first-line:mt-3 mb-0 ' > 
    <div className='  flex justify-center space-x-8 my-8 h-1/5' >

        <div className="bg-grayGreen w-1/3 border border-gray-300 rounded-lg shadow-lg p-6 m-2 transition-transform duration-300 hover:scale-110">
            <h2 className='text-lg font-semibold mb-4'>Hotels</h2> 
            <img className="w-full h-44 object-cover rounded-sm mb-4" src={renderItinerary.hotel.photo} alt="Hotel"/> 
            <p className="text-base font-medium mb-2">{renderItinerary.hotel.name}</p> 
            <p className="text-sm text-gray-600 mb-1">Address: {renderItinerary.hotel.address}</p>
            <p className="text-sm text-gray-600">Rating: {renderItinerary.hotel.rating}</p>
        </div>

        <div className="bg-grayGreen w-1/3 border border-gray-300 rounded-lg shadow-lg p-6 m-2 transition-transform duration-300 hover:scale-110">
            <h2 className='text-lg font-semibold mb-4'>Restaurant</h2> 
            <img className="w-full h-44 object-cover rounded-sm mb-4" src={renderItinerary.restaurant.photo} alt="restaurant"/> 
            <p className="text-base font-medium mb-2">{renderItinerary.restaurant.name}</p> 
            <p className="text-sm text-gray-600 mb-1">Address: {renderItinerary.restaurant.address}</p>
            <p className="text-sm text-gray-600">Rating: {renderItinerary.restaurant.rating}</p>
        </div>

        <div className="bg-grayGreen w-1/3 border border-gray-300 rounded-lg shadow-lg p-6 m-2 transition-transform duration-300 hover:scale-110">
            <h2 className='text-lg font-semibold mb-4'>Attraction</h2> 
            <img className="w-full h-44 object-cover rounded-sm mb-4" src={renderItinerary.attraction.photo} alt="attraction"/> 
            <p className="text-base font-medium mb-2">{renderItinerary.attraction.name}</p> 
            <p className="text-sm text-gray-600 mb-1">Address: {renderItinerary.attraction.address}</p>
            <p className="text-sm text-gray-600">Rating: {renderItinerary.attraction.rating}</p>
        </div>

    </div> 
    </div>
  )
}

export default MyItineraryCards
