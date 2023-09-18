import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryDisplay from './ItineraryDisplay'

const MainPage = ({}) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        console.log('logout clicked')
        navigate('/')
    }

    const handleUserPage = () => {
        console.log('user page clicked')
        navigate('/userpage')
    }

    const backgroundImageStyle = {
        backgroundImage: "url('https://wallpaperaccess.com/full/2201199.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    

    return (
        <>

        
    <div style={backgroundImageStyle}>
        <div className="flex items-center justify-center bg-blue-100" style={backgroundImageStyle}>
        <div className="flex flex-col">
            <div className="absolute left-10 top-10 font-bold self-start text-2xl ml-8">
            {/* Content here */}
            </div>
            <button className="absolute right-10 top-8" onClick={() => handleLogout()}>Logout</button>
            <button className="absolute right-10 top-16" onClick={() => handleUserPage()}>My Itinerary</button>
        </div>
        </div>

    </div>

    <div style={{ flexGrow: 1}}>
        <ItineraryDisplay />
        </div>


        </>
    );
};

export default MainPage;