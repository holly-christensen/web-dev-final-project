// import {Link, useNavigate} from "react-router-dom";
// import React, {useEffect, useState} from "react";
// import {useProfile} from "../contexts/profile-context";
// import UserDetails from "./UserDetails";
// import CreatorDetails from "./CreatorDetails";
// import {useDispatch, useSelector} from "react-redux";
// import {findCreatorByUserId} from "../actions/creator-actions";
//
// const UserProfile = () => {
//     const {profile, signout} = useProfile()
//     const navigate = useNavigate()
//     const signedIn = profile && Object.keys(profile).length > 0
//     console.log(signedIn)
//
//     //console.log(user.user._id)
//     const creators = useSelector((state) => state.creators);
//     let [creator, setCreator] = useState('');
//     const dispatch = useDispatch();
//
//     useEffect(() => findCreator(), []);
//
//     const findCreator = async () => {
//         const current = await findCreatorByUserId(dispatch, profile._id)
//         console.log(current)
//         setCreator(current)
//     }
//
//     //findCreator()
//     //console.log(result)
//     console.log(creator)
//
//     const logout = async () => {
//         try {
//             await signout()
//         } catch (e) {
//
//         }
//         navigate('/signin')
//     }
//
//     const signIn = () => {
//         navigate('/signin')
//     }
//     const handleEditProfile = () => {
//         navigate('/edit-profile')
//     }
//     console.log(profile)
//
//     // if user is not logged in, take them to signin page
//     // if (profile && Object.keys(profile).length === 0) {
//     //     navigate('/signin')
//     // }
//
//     return (
//         <div>
//             <h1>Profile</h1>
//             {!signedIn &&
//                 <button onClick={signIn}
//                     className="btn btn-primary">SignIn</button>
//             }
//             {signedIn &&
//                 <div>
//                     {profile.username}
//                     {/*{profile.type === "USER_CREATOR" && <CreatorDetails user={profile}></CreatorDetails>}*/}
//                     {creator && creator.funFact}
//                     {/*<UserDetails user={profile}></UserDetails>*/}
//                     <button className="btn btn-primary" onClick={logout}>Sign Out</button>
//                 </div>}
//
//         </div>
//     );
//     // return(
//     //     <div>
//     //         <h2>{profile.credentials.username}
//     //             {}
//     //         </h2>
//     //         {profile.profileImg}
//     //         <button className="btn btn-outline-primary" onClick={handleEditProfile}> Edit Profile</button>
//     //         <h3>Following</h3>
//     //         <ul>
//     //             {profile.following.map(podcast => podcast._id)}
//     //         </ul>
//     //     </div>
//     // );
//
// }
// export default UserProfile;

import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useProfile} from "../contexts/profile-context";
import UserDetails from "./UserDetails";
import CreatorDetails from "./CreatorDetails";

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
            {!signedIn &&
                <button onClick={signIn}
                        className="btn btn-primary">SignIn</button>
            }
            {signedIn &&
                <div>
                    <h1>{profile.credentials.username}
                        {profile.type === "USER_CREATOR" && <i className={`fa fa-check-circle ms-2`}/>}</h1>
                    {profile.profileImg}
                    {profile.type === "USER_CREATOR" && <CreatorDetails user={profile}></CreatorDetails>}
                    <UserDetails user={profile}></UserDetails>
                </div>}
        </div>
    );

}
export default UserProfile;