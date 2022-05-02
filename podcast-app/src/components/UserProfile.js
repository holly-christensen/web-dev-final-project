import {useNavigate} from "react-router-dom";
import React from "react";
import {useProfile} from "../contexts/profile-context";
import UserDetails from "./UserDetails";
import CreatorDetails from "./CreatorDetails";
import {USER_CREATOR} from "../user-types";

const UserProfile = () => {
    const {profile, signout} = useProfile()
    const navigate = useNavigate()
    const signedIn = profile && Object.keys(profile).length > 0

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

    const handleEditProfile = () => {
        navigate('/edit-profile')
    }
    return (
        <div>
            {!signedIn &&
                <button onClick={signIn}
                        className="btn btn-primary">SignIn</button>
            }
            {signedIn &&
                <div>
                    <h1>{profile.credentials.username}
                        {profile.type === USER_CREATOR && <i className={`fa fa-check-circle ms-2`}/>}</h1>
                    {profile.type === USER_CREATOR && <CreatorDetails user={profile}></CreatorDetails>}
                    <UserDetails user={profile}></UserDetails>
                    <button className="btn btn-outline-primary" onClick={handleEditProfile}> Edit Profile</button>
                </div>}
        </div>
    );
}
export default UserProfile;