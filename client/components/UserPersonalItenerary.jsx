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
  const navigate = useNavigate();
  
  function logout (){
    fetch('http://localhost:3000/user/logout', {
       credentials: 'include',
       method: 'POST'
    });
    setUserInfo(null);
    return navigate('/')
    
}
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/myitinerary', {
          credentials: 'include',
        });
        const data = await response.json();
        setCurrentItinerary(data);
        setIsLoading(false)

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
      <h1 className="text-white text-2xl font-extrabold bg-olive p-5 shadow-md text-center"> 
        My Itineraries
        </h1>

        {isLoading ? ("") 
        :
          ( <h2 className="bg-olive pl-5 pb-5 text-white font-semibold mb-20">{currentItinerary.currentItinerary[0].hotel.locationName} </h2>
          )
        }

        <button className="text-white font-semibold text-m absolute top-0 right-0 z-10 flex flex-col space-y-5 p-5 pr-4 " onClick={() => logout()}>Logout</button>
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
    

