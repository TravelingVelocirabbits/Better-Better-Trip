import React, { useState, useEffect, useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryDisplay from './ItineraryDisplay'
import { UserContext } from '../UserContext';


export default function MainPage () {
      
    const navigate = useNavigate();

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

    const handleUserPage = () => {
        console.log('user page clicked')
        navigate('/userpage')
    }

    const backgroundImageStyle = {
        backgroundImage: "url('https://rare-gallery.com/uploads/posts/110423-krabi-beach-hd-4k-wallpaper-thailand-best-beaches-in-the-world-tourism-travel-resort-vacation-sand-boat-sky-worlds-best-diving-sites.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '350px',
      };

      const headerStyle = {
        fontFamily: "Pacifico, cursive",
      };
      
      return (
        <>
          <div style={backgroundImageStyle} className="relative">
            <div className='flex justify-center align-center py-7'>
            <h1 className='text-white text-6xl' style={{ fontFamily: 'Pacifico, cursive' }}> Better Trip </h1>
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0 mt-12">
              <ItineraryDisplay />
            </div>
      
            <div className="absolute top-0 right-0 z-10 flex flex-col space-y-5 p-4 mr-6 " >
              <button className="text-white font-extrabold text-m" onClick={() => logout()}>Logout</button>
              <button className="text-white font-extrabold text-m" onClick={() => handleUserPage()}>My Itinerary</button>
            </div>
          </div>
        </>
      );
      

    
 }
