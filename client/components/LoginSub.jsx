import React from 'react'
import Login from './Login';



const LoginSub = ({ username, setUsername, password, setPassword }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-grayGreen">
            <div className="absolute left-0 top-8 font-bold self-start text-2xl text-olive ml-8 ">Better Trip</div>
          <h2 className="text-2xl font-bold text-olive mb-4">Login Here:</h2>
          <form className=" bg-olive rounded-md p-24 shadow-md flex flex-col">

            <div className="flex items-center mb-4">
              <input
                type="text"
                id="username"
                placeholder="Enter Your Username: "
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                className="border rounded-md p-2  bg-gray-100 py-2 px-20"
              />
            </div>
    
            <div className="flex  mb-4 ">
              <input type="password" id="password" placeholder="Enter Your Password:" value={password} onChange={(event) => {
                  setPassword(event.target.value)}}
                className=" border rounded-md p-2 bg-gray-100 py-2 px-20" />
            </div>
            
            <div className = "mt-0 self-center">
            <button className=" bg-gray-400 hover:bg-gray-300 text-white font-bold py-2 px-10 rounded-full">
              Sign In
            </button>
            </div>

          </form>

        </div>

      );
}

export default LoginSub;
//   return (
//     <div className="
//     flex flex-col max-h-screen bg-blue-900" >
//         <h2> Login Here: </h2>

//         <form> 
//             <input 
//                 type="text" 
//                 placeholder="username" 
//                 value={username} 
//                 onChange={event => {
//                     setUsername(event.target.value)
//             }}/>    
//         </form>

//         <form> 
//             <input 
//                 type="text" 
//                 placeholder="password" 
//                 value={password} 
//                 onChange={event => {
//                     setPassword(event.target.value)
//             }}/>    
//         </form>

//         <button className ='border border-black text-black px-4 py-2'>Login</button>
//     </div>
//   )


{/* // <form className="form1" action="">
// <h2 className="logTitle">Login</h2>
// <input type="text" placeholder="username" value={username} onChange={event => {
    setUsername(event.target.value)
}}/>
<input type="password" placeholder="password" value ={password} onChange={event => setPassword(event.target.value)}/>
<button className="logBtn">Login:</button>
</form> */}