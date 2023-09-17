import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useContext }from 'react'
// import { UserContext } from "../UserContext";



const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirecter, setRedirecter] = useState(false);
    // const {setUserInfo} = useContext(UserContext)

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
        <div className="logContainer" onSubmit={log}>
        <form className="form1" action="">
            <h2 className="logTitle">Login</h2>
            <input type="text" placeholder="username" value={username} onChange={event => {
                setUsername(event.target.value)
            }}/>
            <input type="password" placeholder="password" value ={password} onChange={event => setPassword(event.target.value)}/>
            <button className="logBtn">Login:</button>
        </form>
    </div>
    )
}

export default Login;