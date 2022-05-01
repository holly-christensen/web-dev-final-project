import React from 'react';
import {useNavigate} from "react-router-dom";
import {getPodcastsById} from "../useRequest";
import {findPodcastById} from "../services/podcast-service";

const UserDetails = (user) => {
    console.log("in user details")
    const navigate = useNavigate()
    const handleEditProfile = () => {
        navigate('/edit-profile')
    }

    const getPodcastInfo = async (pid) => {
        console.log(pid)
        const podcastInfo = await findPodcastById(pid);
        console.log("got podcast info")
        console.log(podcastInfo)
        return podcastInfo;
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
                {profile.following.map(podcast => getPodcastInfo(podcast.podcastId).title)}
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