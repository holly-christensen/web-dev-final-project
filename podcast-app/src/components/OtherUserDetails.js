import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsers, findUserById} from "../actions/user-actions";
import {getEpisodesById} from "../useRequest";
import UserDetails from "./UserDetails";

const OtherUserDetails = () => {
    let {uid} = useParams();
    //const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    let [viewedUser, setViewedUser] = useState({})

    //console.log(user)
    console.log(uid)
    useEffect(() => getUserInfo, [uid]);

    const getUserInfo = async () => {
        console.log("getting user info")
        const userInfo = await findUserById(dispatch, uid);
        console.log(userInfo)
        setViewedUser(userInfo)
    }

    console.log(viewedUser)
    return(
        <div>
            {viewedUser.email && <UserDetails user={viewedUser}></UserDetails>}
        </div>
    );
};

export default OtherUserDetails;