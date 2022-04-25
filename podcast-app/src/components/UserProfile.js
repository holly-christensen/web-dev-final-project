import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useProfile} from "../contexts/profile-context";

const UserProfile = () => {
    const {profile, signout} = useProfile()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signout()
        } catch (e) {

        }
        navigate('/signin')
    }
    return (
        <div>
            <h1>Profile</h1>
            {profile && profile.email}
            <button
                onClick={logout}
                className="btn btn-danger">
                Logout
            </button>
        </div>
    );

}
export default UserProfile;