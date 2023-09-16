import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useContext }from 'react'
const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirecter, setRedirecter] = useState(false);

    async function log(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type':'application/json'},
            credentials: 'include',
        });
        if(response.ok){ 
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                return navigate('/')  
            })
        }else{
            alert('network response error')
        }
    }

   return (
        <div className="logContainer" onSubmit={log}>
        <form className="form1" action="">
            <h2 className="logTitle">Sign Up:</h2>
            <input type="text" placeholder="username" value={username} onChange={event => {
                setUsername(event.target.value)
            }}/>
            <input type="password" placeholder="password" value ={password} onChange={event => setPassword(event.target.value)}/>
            <button className="logBtn">enter</button>
        </form>
    </div>
    )
}



    export default Signup;