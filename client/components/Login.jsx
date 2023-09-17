import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import LoginSub from "./LoginSub";
import SignupSub from "./SignupSub";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    //LOCALHOST3000/USERS/LOGIN
    //POST REQUEST 


    async function log(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type':'application/json'},
            credentials: 'include',
        });
        if(response.ok){ 
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                return navigate('/mainpage')  
            })
        }else{
            alert('wrong credentials')
        }
    }


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

