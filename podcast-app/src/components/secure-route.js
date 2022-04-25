import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useProfile} from "../contexts/profile-context";

const SecureRoute = ({children}) => {
    const {checkLoggedIn} = useProfile()
    const [currentUser, setCurrentUser] = useState()
    const [waiting, setWaiting] = useState(true)
    const check = async () => {
        console.log("in check")
        try {
            const user = await checkLoggedIn()
            console.log("after checkLoggedIn")
            console.log(user)
            setCurrentUser(user)
            setWaiting(false)
        } catch (e) {
            setWaiting(false)
        }
    }
    useEffect(() => { check() }, [])
    if(currentUser) {
        return children
    } else if(waiting) {
        return null
    } else {
        return <Navigate to="/signin"/>
    }
};

export default SecureRoute;