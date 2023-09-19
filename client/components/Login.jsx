import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import LoginSub from "./LoginSub";
import SignupSub from "./SignupSub";

const Login = () => {
    


    return (
        <div className="flex w-full h-full">
            <div style={{ flexGrow: 3 }}>
                <LoginSub
                    useContext = {useContext}
                    useState={useState}
                    navigate = {useNavigate}
                    
                />
            </div>
            <div style={{ flexGrow: 1 }}>
                <SignupSub 
                    navigate = {useNavigate}
                
                />
            </div>
        </div>
    );
}

export default Login;

