import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {findAllComments} from "./actions/comment-actions";
import {findAllUsers, createUser} from "./actions/user-actions";

const UserSignUp = () => {

    const initialUserDetails = {
        firstname: '',
        lastname: '',
        phoneNumber: '',
        username: '',
        email: '',
        password: ''
    }
    let [userDetails, setUserDetails] = useState(initialUserDetails);

    const users = useSelector((state) => state.users);

    const dispatch = useDispatch();

    // TODO: I think we should call signup in contexts/profile-context here instead
    const createUserHandler = () => {
        createUser(dispatch, userDetails)
            .then(r => setUserDetails(initialUserDetails));
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setUserDetails({
            ...userDetails,
            [event.target.name]: value
        });
    }

    useEffect(() => findAllUsers(dispatch), []);

    return (
        <div>
            <h1>User Sign Up</h1>
            <div>{JSON.stringify(users)}</div>
            <h2>Sign Up</h2>
            <pre>{JSON.stringify(userDetails)}</pre>

            <label>First name
                <input
                    value={userDetails.firstname}
                    name={"firstname"}
                    onChange={handleInputChange}>
                </input>
            </label>
            <br/>
            <label>Last name
                <input value={userDetails.lastname}
                       name={"lastname"}
                       onChange={handleInputChange}>
                </input>
            </label>
            <br/>
            <label>Phone Number
                <input value={userDetails.phoneNumber}
                       name={"phoneNumber"}
                       onChange={handleInputChange}>
                </input>
            </label>
            <br/>
            <label>Username
                <input value={userDetails.username}
                       name={"username"}
                       onChange={handleInputChange}>
                </input>
            </label>
            <br/>
            <label>Email
                <input value={userDetails.email}
                       name={"email"}
                       type={"email"}
                       onChange={handleInputChange}>
                </input>
            </label>
            <br/>
            <label>Password
                <input value={userDetails.password}
                       name={"password"}
                       type={"password"}
                       onChange={handleInputChange}>
                </input>
            </label>
            <br/>

            <button onClick={createUserHandler}>
                Submit
            </button>
        </div>
    );
};

export default UserSignUp;
