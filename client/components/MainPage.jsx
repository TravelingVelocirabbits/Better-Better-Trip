import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
        <h1 className="text-primary text-7xl font-bold">Hello world! I am using React</h1>
         </div>

    )
}

export default MainPage;