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
    useEffect(() => getUserInfo(), []);


    const getUserInfo = async () => {
        console.log("getting user info")
        let result = {}
        await findUserById(dispatch, {_id: uid}).then(user => setViewedUser(user))
        // console.log(userInfo)
        // console.log(result)
        // setViewedUser(userInfo)
        // return userInfo
    }

    const userId = {_id: uid}

    function RenderComponent() {
        //const info = getUserInfo()
        //console.log(info)
        console.log("in render component")
        return (
            <div>
                <h1>Other User</h1>
                {viewedUser && <UserDetails user={viewedUser}></UserDetails>}
            </div>
        );
    }

    console.log(viewedUser)
    return(
        <div>
            {/*{viewedUser.email}*/}
            <RenderComponent/>
        </div>
    );
};

export default OtherUserDetails;