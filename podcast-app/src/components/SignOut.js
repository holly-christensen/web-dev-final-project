import React from 'react';
import {useProfile} from "../contexts/profile-context";
import {useNavigate} from "react-router-dom";

const SignOut = () => {
    const {signout} = useProfile()
    const navigate = useNavigate()
    const logout = async () => {
        try {
            await signout()
        } catch (e) {
        }
        navigate('/signin')
    }

    logout()
    return (
        <div>
            <h1>Sign Out</h1>
        </div>
    );
};

export default SignOut;