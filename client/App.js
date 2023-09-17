import React from "react";
import {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.css'; //added line
import Login from './components/Login'
import Signup from './components/Signup'
import MainPage from './components/MainPage'

//rafc code to make fast components

const App = () => {


  return (   

            <Routes>
                
                <Route path = '/' element={<Login/>} />
                <Route path = '/signup' element={<Signup/>} />
                <Route path = '/mainpage' element={<MainPage />} />
         
            </Routes>
           
         );
};


export default App;