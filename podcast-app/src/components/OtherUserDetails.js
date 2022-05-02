import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsers, findUserById} from "../actions/user-actions";
import {getEpisodesById} from "../useRequest";
import UserDetails from "./UserDetails";
import UserProfile from "./UserProfile";
import CreatorDetails from "./CreatorDetails";

const OtherUserDetails = () => {
    let {uid} = useParams();
    const dispatch = useDispatch();
    let [viewedUser, setViewedUser] = useState({})

    useEffect(() => getUserInfo().then(user => setViewedUser(user)), []);

    const getUserInfo = async () => {
        const res =  await findUserById(dispatch, {_id: uid})
        return res;
    }

    return(
        <div>
            <div> {viewedUser.credentials && <div>
                <h1>{viewedUser.credentials.username}
                    {viewedUser.type === "USER_CREATOR" && <i className={`fa fa-check-circle ms-2`}/>}</h1>
                {viewedUser.type === "USER_CREATOR" && <CreatorDetails user={viewedUser}></CreatorDetails>}
                <UserDetails user={viewedUser}></UserDetails>
            </div>
            }
            </div>
        </div>
    );
};

export default OtherUserDetails;