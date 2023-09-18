import React, {useEffect, useState} from 'react'

import { useNavigate } from 'react-router'

const UserPersonalItenerary = () => {
  const [currentItinerary, setCurrentItinerary] = useState([])
  
  
  useEffect(()=> {
    fetch('http://localhost:3000/user/myitinerary', {
        credentials: 'include', 

    }).then(response => response.json())
      .then(data => setCurrentItinerary(data))
       
},[])

console.log(currentItinerary.currentItinerary)
const renderItinerary = currentItinerary.currentItinerary

function render(renderItinerary){
  return (
    <div>
      
    </div>
  )

  
}



  return (
    <div>
      <h1> Testing user page </h1>
    </div>
  )
}

export default UserPersonalItenerary
