import { useState, useEffect} from "react";
import React from "react";

import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function reg(ev) {
        ev.preventDefault();
        
       const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-type': 'application/json'}
        })
        if (response.status !== 200) {
            alert('Registration failed.')
        } else {
            alert('Registration Successful')
            return navigate('/')
        }
    }
   return (
        <div className="flex justify-center items-center h-screen bg-grayGreen"onSubmit={reg}>
        <form className="bg-white p-8 rounded-lg shadow-md w-1/3" action="">
            <h2 className="text-2xl font-semibold mb-4">Sign Up:</h2>
            <div className="mb-4">
            <input className="w-full border-none border-rounded text-base" type="text" placeholder="username" value={username} onChange={event => {
                setUsername(event.target.value)
            }}/>
            </div>
            <div className="mb-4">
            <input className=" w-full border-none border-rounded text-base" type="password" placeholder="password" value ={password} onChange={event => setPassword(event.target.value)}/>
            </div>
            <button className="w-full p-2 h-8 text-white rounded-md text-m bg-olive" > Enter </button>

        </form>
    </div>
    )
}





    export default Signup;