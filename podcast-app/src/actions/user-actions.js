import * as service from '../services/user-service.js';
import {signupUser} from "../services/user-service.js";

export const CREATE_USER = 'CREATE_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';
export const FIND_USER_BY_ID = 'FIND_USER_BY_ID';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

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
export const findUserById = async (dispatch, userInput) => {
    const user = await service.findUserById(userInput);
    dispatch({
        type: FIND_USER_BY_ID,
        user
    });
    return user;
}

export const updateUser = async (dispatch, user) => {
    const response = await service.updateUser(user);
    dispatch({
        type: UPDATE_USER,
        user
    });
    return user;
}
export const deleteUser = async (dispatch, user) => {
    const response = await service.deleteUser(user);
    dispatch({
        type: DELETE_USER,
        user
    })
}