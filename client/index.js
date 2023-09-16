import React from "react";
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './stylesheets/styles.css';
import App from "./App";

const root = createRoot(document.getElementById('root'));

root.render( 
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)


