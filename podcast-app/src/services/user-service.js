import axios from 'axios';
const USERS_API = 'http://localhost:4000/api/users';
const SIGNUP_API = 'http://localhost:4000/api/signup';

export const createUser = async (user) => {
    const response = await axios.post(USERS_API, user)
    return response.data;
}

export const signupUser = async (user) => {
    const response = await axios.post(SIGNUP_API, user)
    return response.data;
}

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API);
    const users = response.data;
    return users;
}

export const findUserById = async (user) => {
    const response = await axios.get(`${USERS_API}/${user._id}`, user);
    const users = response.data;
    return users;
}

export const deleteUser = async (user) => {
    const response = await axios
        .delete(`${USERS_API}/${user._id}`);
    return response.data;
}
export const updateUser = async (user) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
}

export const upsertUser = async (user) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
}