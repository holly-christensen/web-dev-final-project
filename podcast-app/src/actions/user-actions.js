import * as service from '../services/user-service.js';
import {signupUser} from "../services/user-service.js";

export const CREATE_USER = 'CREATE_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';
export const FIND_USER_BY_ID = 'FIND_USER_BY_ID';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// export const createUser = async (dispatch, userDetails) => {
//     const newUser = {
//         firstName: userDetails.firstname,
//         lastName: userDetails.lastname,
//         phoneNumber: userDetails.phoneNumber,
//         profileImg: '',
//         email: userDetails.email,
//         credentials: {
//             username: userDetails.username,
//
//             password: userDetails.password,
//         },
//         type: USER_CONSUMER,
//         following: [],
//         comments: [],
//         reviews: []
//     }
//     const user = await service.createUser(newUser);
//     dispatch({
//         type: CREATE_USER,
//         user
//     });
//     return user;
// }

export const signUpUser = async (dispatch, userDetails) => {
    const newUser = await signupUser(userDetails);
    dispatch({
        type: SIGNUP_USER,
        user: newUser
    })
    return newUser;
}

export const findAllUsers = async (dispatch) => {
    const users = await service.findAllUsers();
    dispatch({
        type: FIND_ALL_USERS,
        users
    });
}
export const findUserById = async (dispatch, userId) => {
    const user = await service.findUserById(userId);
    dispatch({
        type: FIND_USER_BY_ID,
        user
    });
}

export const updateUser = async (dispatch, user) => {
    const response = await service.updateUser(user);
    dispatch({
        type: UPDATE_USER,
        user
    });
}
export const deleteUser = async (dispatch, user) => {
    const response = await service.deleteUser(user);
    dispatch({
        type: DELETE_USER,
        user
    })
}