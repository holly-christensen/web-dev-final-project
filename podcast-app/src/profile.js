import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useProfile} from "./contexts/profile-context";

const Profile = () => {
    const {profile, signout} = useProfile()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signout()
        } catch (e) {

        }
        navigate('/signin')
    }
    console.log("profile is")
    console.log(profile)
    return (
        <div>
            <h1>Profile</h1>
            {profile && profile.credentials.email}
        </div>
    );

}
export default Profile;