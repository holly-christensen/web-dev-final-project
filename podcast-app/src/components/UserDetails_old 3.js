import React from 'react';
import {useNavigate} from "react-router-dom";

const UserDetails = (user) => {
    console.log(user.user.email)
    //const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate()
    const handleEditProfile = () => {
        navigate('/edit-profile')
    }


    const profile = user.user
    console.log(profile.following)
    return (
        <div>
            <h2>{profile.credentials.username}</h2>
            {profile.profileImg}
            <button className="btn btn-outline-primary" onClick={handleEditProfile}> Edit Profile</button>
            <h3>Following</h3>
            <ul>
                {profile.following.map(podcast => podcast)}
            </ul>
        </div>
    );
};

export default UserDetails;