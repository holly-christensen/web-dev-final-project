import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from "axios";
import {findAllUsers} from "./services/user-service.js";

const UserList = () => {
    const users = useSelector((state) => state);
    console.log(users);
    const dispatch = useDispatch();
    useEffect(() => findAllUsers(dispatch), []);
    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     findAllUsers()
    // }, [])
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {JSON.stringify(users)}
                {/*{users && */}
                {/*    users.map(user =>*/}
                {/*        <li>*/}
                {/*            {user.firstName}*/}
                {/*        </li>*/}
                {/*    )*/}
                {/*}*/}
            </ul>
        </div>
    );
};

export default UserList;