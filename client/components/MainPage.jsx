import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryDisplay from './ItineraryDisplay'

const MainPage = ({}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log('logout clicked')
        navigate('/')
    }
    const handleEdit = () => {
        console.log('edit clicked')
    }

    return (
        <>
        <div  className="flex items-center justify-center bg-blue-100" >

            <div className = "flex flex-col">
                <div className = "absolute left-10 top-10 font-bold self-start text-2xl ml-8 ">
                Hey User
                </div>
                <button className="absolute right-10 top-10" onClick={() => handleLogout()}>Logout </button>
                <button className="absolute right-10 top-16" onClick={() => handleEdit()}>Edit</button>
            </div>
        </div>
        
        <div style={{flexGrow: 1}}>
            <ItineraryDisplay 
            
            />
        </div>
        </>
    );
};

export default MainPage;