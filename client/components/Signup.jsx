import { useState, useEffect} from "react";
import React from "react";

const Signup = () => {
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
        }
    }
   return (
        <div className="logContainer" onSubmit={reg}>
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