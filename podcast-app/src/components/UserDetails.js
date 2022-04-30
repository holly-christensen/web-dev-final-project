import React from 'react';
import {useNavigate} from "react-router-dom";

const UserDetails = (user) => {
    const navigate = useNavigate()
    const handleEditProfile = () => {
        navigate('/edit-profile')
    }


    const profile = user.user
    console.log(profile.following)
    console.log(profile)
    return (
        <div>
            <h3>User Information</h3>
            <p><strong>{profile.firstName} {profile.lastName}</strong></p>
            <p><strong>Email: </strong> {profile.email}</p>
            <p><strong>Phone Number: </strong> {profile.phoneNumber}</p>
            <h4>Following</h4>
            <ul>
                {profile.following.map(podcast => podcast._id)}
            </ul>
            <h4>Comments</h4>
            <ul>
                {profile.comments.map(podcast => podcast._id)}
            </ul>
            <h4>Reviews</h4>
            <ul>
                {profile.reviews.map(podcast => podcast._id)}
            </ul>
            <button className="btn btn-outline-primary" onClick={handleEditProfile}> Edit Profile</button>
        </div>
    );
};

export default UserDetails;