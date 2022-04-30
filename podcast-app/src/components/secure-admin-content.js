import React, {useEffect, useState} from 'react';
import {useProfile} from "../contexts/profile-context";
import {USER_ADMIN} from "../user-types";

const SecureAdminContent = ({children}) => {
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
    if(userType === USER_ADMIN) {
        return children
    }
    return null
};

export default SecureAdminContent;