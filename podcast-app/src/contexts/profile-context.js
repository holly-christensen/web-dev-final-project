import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {USER_CONSUMER} from "../user-types";
//import {signupUser} from "../services/user-service";
import {signUpUser, updateUser} from "../actions/user-actions";

const ProfileContext = React.createContext()

const api = axios.create({withCredentials: true})

export const ProfileProvider = ({children}) => {
    let [profile, setProfile]
        = useState({})
    const dispatch = useDispatch();

    const signout = async () => {
        const response = await api
            .post("http://localhost:4000/api/signout")
        setProfile(null)
    }

    const checkLoggedIn = async () => {
        try {
            const response = await api
                .post("http://localhost:4000/api/profile")
            setProfile(response.data)
            return response.data
        } catch (e) {
            throw e
        }
    }

    const upgradeUserToCreator = async () => {
        const updatedUser = {
            ...profile,
            type: "USER_CREATOR"
        }
        console.log(updatedUser)
        const response = await updateUser(dispatch, updatedUser);
        console.log(response)
        setProfile(response)
    }

    const signup = async (username, email, password, firstname, lastname, phonenumber) => {
        const userDetails = {
            credentials: {
                username: username,
                password: password,

            },
            email: email,
            profileImg: '',
            type: USER_CONSUMER,
            following: [],
            comments: [],
            reviews: [],
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phonenumber
        }
        try {
            const response = await signUpUser(dispatch, userDetails);
            setProfile(response);
        } catch (e) { throw e }
    }


    const signin = async (email, password) => {
        try {
            const response = await api
                .post("http://localhost:4000/api/signin",
                    {email, password})
            setProfile(response.data)
        } catch (e) {
            throw e
        }
    }

    const value = {signout, signin, profile, signup, checkLoggedIn, upgradeUserToCreator}
    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {
    return useContext(ProfileContext)
}