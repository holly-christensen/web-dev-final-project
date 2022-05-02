import {useProfile} from "../contexts/profile-context";
import {Link, useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {USER_CONSUMER} from "../user-types";
import {updateUser} from "../services/user-service";

const EditProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const lastRef = useRef()
    const usernameRef = useRef()
    const firstRef = useRef()
    const phoneRef = useRef()
    let {profile} = useProfile()
    const navigate = useNavigate()
    const signedIn = profile && Object.keys(profile).length > 0
    const signIn = () => {
        navigate('/signin')
    }

    const handleEditProfile = async () => {
        if (usernameRef.current.value.length == 0
            || emailRef.current.value.length == 0 ||
            passwordRef.current.value.length == 0) {
            alert("update failed - missing required field(s)")
            return;
        }
        const updatedUser = {
            _id: profile._id,
            credentials: {
                username: usernameRef.current.value,
                password: passwordRef.current.value

            },
            email: emailRef.current.value,
            type: profile.type,
            following: profile.following,
            comments: profile.comments,
            reviews: profile.reviews,
            firstName: firstRef.current.value,
            lastName: lastRef.current.value,
            phoneNumber: phoneRef.current.value
        }
        try {
            const result = await updateUser(updatedUser);
            profile = updatedUser
            navigate('/profile')
        } catch (e) {
            console.log(e)
            alert ("Could not update profile")
        }
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            {!signedIn &&
                <button onClick={signIn}
                        className="btn btn-primary">SignIn</button>
            }
            {signedIn &&
                <div>
                    <label>Username
                        <input ref={usernameRef}
                           defaultValue={profile.credentials.username}
                           type="username" required
                           className="form-control"/></label>
                    <br></br>
                    <label>Email
                        <input ref={emailRef}
                                       defaultValue={profile.email}
                                       type="email"
                                       required
                                       className="form-control"/></label>

                    <br></br>
                    <label>Password
                        <input ref={passwordRef}
                                        placeholder="password"
                                          type="password"
                                          required
                                          className="form-control"/></label>
                    <br></br>
                    <label>First Name
                        <input ref={firstRef}
                                             defaultValue={profile.firstName}
                                             type="text"
                                             className="form-control"/></label>

                    <br></br>
                    <label>Last Name
                        <input ref={lastRef}
                                            defaultValue={profile.lastName}
                                            type="text"
                                            className="form-control"/></label>
                    <br></br>
                    <label>Phone Number
                        <input ref={phoneRef}
                                               defaultValue={profile.phoneNumber}
                                               type="text"
                                               className="form-control"/></label>
                    <br></br><br></br>
                    {profile.type === "USER_CONSUMER" &&
                        <p>Are you a creator? Register
                            <Link to="/creator-signup" className="ps-1">
                             here
                        </Link> </p>}

                    <button className="btn btn-primary" onClick={handleEditProfile}>Submit</button>
                </div>}

        </div>
    );
}
export default EditProfile;