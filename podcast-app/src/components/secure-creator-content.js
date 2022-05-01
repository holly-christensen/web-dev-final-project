import React, {useEffect, useState} from 'react';
import {useProfile} from "../contexts/profile-context";
import {USER_CREATOR} from "../user-types";

const SecureCreatorContent = ({children}) => {
    const {checkUserType} = useProfile()
    const [userType, setUserType] = useState("")
    const check = async () => {
        try {
            const type = await checkUserType();
            setUserType(type)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => { check() }, [])
    if(userType === USER_CREATOR) {
        return children
    }
    return null
};

export default SecureCreatorContent;