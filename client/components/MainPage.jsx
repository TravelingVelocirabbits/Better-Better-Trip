import React, { useState, useEffect, useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryDisplay from './ItineraryDisplay'
import { UserContext } from '../UserContext';

export default function MainPage () {
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     console.log('logout clicked')
    //     navigate('/')
    // }
    const {setUserInfo, userInfo} = useContext(UserContext)
    

     function logout (){
         fetch('http://localhost:3000/user/logout', {
            credentials: 'include',
            method: 'POST'
         });
         setUserInfo(null);
         return navigate('/')
         
    }

    const username = userInfo?.username;
    const handleEdit = () => {
        console.log('edit clicked')
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
            <button className="absolute right-10 top-8" onClick={() => logout()}>Logout</button>
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

