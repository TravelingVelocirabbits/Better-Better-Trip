import React from 'react';
import { GrFormClose } from 'react-icons/gr';

const SignupSub = () => {
    return (
        <div className="px-14 flex flex-col h-screen bg-olive justify-between">
            <div className="self-end mt-4">
            </div>
            <div className="flex flex-col justify-center items-center space-y-4">
                <h2 className="text-4xl font-bold text-white">New Here?</h2>
                <p className="text-xl text-white">Sign up and plan your next getaway</p>
                <button className="text-black text-sm bg-white font-bold py-2 px-10 rounded-full w-45">
                    Sign Up
                </button>
            </div>
            <div className="mb-4">
                {/* Empty div to balance out the flexbox layout */}
            </div>
        </div>
    );
}

export default SignupSub;
