import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import axios from "axios";
import {findAllComments} from "./actions/comment-actions";
import {findAllUsers} from "./actions/user-actions";

const UserList = () => {
    const users = useSelector((state) => state.users);
    const comments = useSelector((state) => state.comments);
    console.log(users);
    console.log(comments);
    const dispatch = useDispatch();
    useEffect(() => findAllUsers(dispatch), []);
    useEffect(() => findAllComments(dispatch), []);
    console.log(users);
    console.log(comments);
    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     findAllUsers()
    // }, [])
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {JSON.stringify(users)}
             </ul>
            <h1>Comments</h1>
            <div>{JSON.stringify(comments)}</div>
        </div>
    );
};

export default UserList;