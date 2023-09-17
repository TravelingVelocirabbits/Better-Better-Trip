import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import LoginSub from "./LoginSub";
import SignupSub from "./SignupSub";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ... rest of your code

    return (
        <div className="flex w-full h-full">
            <div style={{ flexGrow: 3 }}>
                <LoginSub
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
            <div style={{ flexGrow: 1 }}>
                <SignupSub />
            </div>
        </div>
    );
}

export default Login;

