import MainPage from './MainPage'
import React, { useState, useEffect }from 'react';
import IteneraryCard from './IteneraryCard';
import { useNavigate } from 'react-router-dom';


const ItineraryContainer = ({  }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        console.log('user page clicked')
        navigate('/userpage')
    }

    const [query, setQuery] = useState("")
    const [iteneraryData, setIteneraryData] = useState([])
    const [isPending, setPending] = useState(false)


    // const [deletedItenerary, setDeletedI] = useState([])
    

    const fetchLocations = async () => {
        try {
            
            const response = await fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ location: query })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const resData = await response.json();
            console.log("Received Data:", resData);
    
            setIteneraryData(resData);
    
        } catch (err) {
            console.log("Error:", err);
        }
    };
  
    const handleInputChangeText = (value) => {
        setQuery(value);
    };

    const handleFetchAndDataDisplay =  () => {
         fetchLocations();
         setPending(true);
    }


    const handleDeleteItenerary = (hotelName) => {
        const filterIteneraryData = iteneraryData.filter(iteneraryEl => iteneraryEl.hotel.name !== hotelName)
        setIteneraryData(filterIteneraryData);
    }

    //Save Feature 
    const handleSaveItinerary = async () => {
        try {
          const response = await fetch('', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ iteneraryData })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
        } catch (err) {
          console.log(err);
        }
      };
    

    return (
        <div className ="flex flex-col justify-center items-center" >
            <div className="flex flex-row items-center justify-center h-80 ">
                <input   className="w-full text h-7  border p-2 border-black rounded-sm text-black shadow-md hover:shadow-lg"
                    type="text"
                    placeholder="Plan Your Next Destination"
                    value={query}
                    onChange={(e) => handleInputChangeText(e.target.value)}
                    />
                <button className= " bg-olive w-1/3 h-7 text-lg border-none rounded text-white shadow-md hover:shadow-lg"

 onClick = {() => handleFetchAndDataDisplay() }> Search </button>
            </div>

            <div  className='flex flex-col justify-around items-end'>
            { isPending && <button className=' mr-5 border w-11 text-white bg-olive border-none rounded shadow-md' onClick={handleSaveItinerary}>  Save </button> }
            {  isPending && iteneraryData.map((element, index) => {
                return <IteneraryCard handleDeleteItenerary={handleDeleteItenerary} key={index}  index={index} iteneraryData={element}/>
                })   
            }
            </div>

        </div>

    );
};

export default ItineraryContainer;


//