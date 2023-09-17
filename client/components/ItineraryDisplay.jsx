import MainPage from './MainPage'
import React, { useState, useEffect }from 'react';

const ItineraryContainer = ({  }) => {

    const [query, setQuery] = useState("")

    const [location, setLocation] = useState("")
    
      //add this to the qeury 
    const fetchLocations = () => {

        fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({location: query})
        })
        .then (data => data.json())
        .then(resData => {
            console.log(resData);
        }) .catch (err => console.log(err))
     
    };

//     const fetchLocationsWithText = (value) => {
//         fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${value}&apiKey=VVNfZmE1NmNiODg5MWM3NGM4NmI3NWVkOGYxNjUwZWQxMjM6MWFiOTk3MzctZGZkMC00NzlmLTljYmItZDYyMTZlMjEyZWYw`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//     });
// }
    const handleInputChangeText = (value) => {
        setQuery(value);
        // fetchLocationsWithText(value)
    };




    return (
        <div className ="flex flex-col justify-center items-center">
            <div className="flex flex-row items-center justify-center h-80 ">
                <input className='border border-black rounded-l-lg'
                    type="text"
                    placeholder="Send Me Your Location: "
                    value={query}
                    onChange={(e) => handleInputChangeText(e.target.value)}
                    />
                <button className="border border-black rounded-r-lg" onClick = {fetchLocations}> Click  away </button>
            </div>
            <div className=" rounded-2xl flex flex-col items-center justify-center box-border w-96 p-4 border-4 h-64">
                itinerary component 
            </div>
            </div>
        
        
    );
};

export default ItineraryContainer;


//