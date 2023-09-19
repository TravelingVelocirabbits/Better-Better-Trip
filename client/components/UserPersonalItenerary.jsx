import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router'
import IteneraryCard from './IteneraryCard'
//http://localhost:8080/userpage
import MyItineraryCards from './MyItineraryCards' 
import { UserContext } from '../UserContext';

const UserPersonalItenerary = ({}) => {
  const [currentItinerary, setCurrentItinerary] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const {setUserInfo, userInfo} = useContext(UserContext)
  // const {currentLocation, setCurrentLocation} = useState("")

  const navigate = useNavigate();
  
  function logout (){
    fetch('http://localhost:3000/user/logout', {
       credentials: 'include',
       method: 'POST'
    });
    setUserInfo(null);
    return navigate('/')
    
  }

  const backHomeButton = () => {
    return navigate('/mainpage')
  }
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/myitinerary', {
          credentials: 'include',
        });
        const data = await response.json();
        setCurrentItinerary(data);
        setIsLoading(false);
        // setCurrentLocation(data.currentItinerary[data.currentItinerary.length - 1].hotel.locationName)
        // console.log("currentt location", currentLocation)
        

      } catch (error) {
        console.error("There was a problem fetching the data", error);
      }
    };
  
    fetchData();
  }, []);
  
    
    const renderItinerary = currentItinerary.currentItinerary
    // console.log(renderItinerary)
    console.log("This is the header place", currentItinerary)

    //Invoke a Map Method On a sbucompoent which is IteneraryCard -> Prop 
    //name consistant with what is in IteneraryCard

    return (
      <div>

        <div className="flex justify-between items-center bg-olive pt-6 p-6 shadow-md">
          <h1 className="text-white text-2xl font-extrabold text-center">
            My Itineraries
          </h1>
          <div></div> 
          <div className="flex space-x-4">
            <button className="text-white font-semibold text-m p-5 pr-4"
              onClick={() => backHomeButton()}> Home </button>
            <button className="text-white font-semibold text-m p-5 pr-4"
              onClick={() => logout()}>Logout</button>
          </div>
      </div>
    
 
        {isLoading ? (<p> loading... </p>)
        : (
          renderItinerary.map((element, index) => {
            return <MyItineraryCards key={index} index={index} renderItinerary={element} />
          })
        )
      }

      </div>
    
    
    )

}


    
    export default UserPersonalItenerary
    

