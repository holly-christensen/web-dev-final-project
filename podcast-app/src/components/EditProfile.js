import {useProfile} from "../contexts/profile-context";
import {useNavigate} from "react-router-dom";
import UserDetails from "./UserDetails";
import React, {useRef, useState} from "react";

const EditProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const lastRef = useRef()
    const usernameRef = useRef()
    const firstRef = useRef()
    const phoneRef = useRef()
    const {profile, signout} = useProfile()
    const navigate = useNavigate()
    const signedIn = profile && Object.keys(profile).length > 0
    const [selectedFile, setSelectedFile] = useState('');
    const signIn = () => {
        navigate('/signin')
    }

    console.log(profile)
    return (
        <div>
            <h1>Edit Profile</h1>
            {!signedIn &&
                <button onClick={signIn}
                        className="btn btn-primary">SignIn</button>
            }
            {signedIn &&
                <div>
                    <h4>Edit profile picture</h4>
                    {profile.profileImg}
                    <input type="file"
                           onChange={(e) => setSelectedFile(e.target.files[0])}/>
                    <br></br>
                    <label>Username
                        <input ref={usernameRef}
                           placeholder={profile.credentials.username}
                           type="username"
                           className="form-control"/></label>
                    <br></br>
                    <label>Email
                        <input ref={emailRef}
                                       placeholder={profile.email}
                                       type="email"
                                       className="form-control"/></label>

                    <br></br>
                    <label>Password
                        <input ref={passwordRef}
                                          placeholder="password"
                                          type="password"
                                          className="form-control"/></label>
                    <br></br>
                    <label>First Name
                        <input ref={firstRef}
                                             placeholder={profile.firstName}
                                             type="text"
                                             className="form-control"/></label>

                    <br></br>
                    <label>Last Name
                        <input ref={lastRef}
                                            placeholder={profile.lastName}
                                            type="text"
                                            className="form-control"/></label>
                    <br></br>
                    <label>Phone Number
                        <input ref={phoneRef}
                                               placeholder={profile.phoneNumber}
                                               type="text"
                                               className="form-control"/></label>

                    <br></br><br></br>
                    <button className="btn btn-primary">Submit</button>
                </div>}

        </div>
    );
}
export default EditProfile;