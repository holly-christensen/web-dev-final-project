import React, {useEffect} from 'react';
import {useProfile, checkLoggedIn} from "../contexts/profile-context";

const Homepage = () => {
    const {profile} = useProfile();
    return (
        <div>
            <h1>Homepage!!</h1>
        </div>
    );
};

export default Homepage;