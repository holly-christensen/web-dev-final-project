import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useProfile} from "../contexts/profile-context";
import UserDetails from "./UserDetails";

const UserProfile = () => {
    const {profile, signout} = useProfile()
    const navigate = useNavigate()
    const signedIn = profile && Object.keys(profile).length > 0
    console.log(signedIn)

    const logout = async () => {
        try {
            await signout()
        } catch (e) {

        }
        navigate('/signin')
    }

    const signIn = () => {
        navigate('/signin')
    }
    console.log(profile)

    // if user is not logged in, take them to signin page
    // if (profile && Object.keys(profile).length === 0) {
    //     navigate('/signin')
    // }

    return (
        <div>
            <h1>Profile</h1>
            {!signedIn &&
                <button onClick={signIn}
                    className="btn btn-primary">SignIn</button>
            }
            {signedIn &&
                <div>
                    <UserDetails user={profile}></UserDetails>
                    <button className="btn btn-primary" onClick={logout}>Sign Out</button>
                </div>}

        </div>
    );

}
export default UserProfile;