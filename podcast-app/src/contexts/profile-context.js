import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {USER_CONSUMER} from "../user-types";
import {signupUser} from "../services/user-service";
import {signUpUser} from "../actions/user-actions";

const ProfileContext = React.createContext()

const api = axios.create({withCredentials: true})

export const ProfileProvider = ({children}) => {
    const [profile, setProfile]
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
            firstname: firstname,
            lastname: lastname,
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

    const value = {signout, signin, profile, signup, checkLoggedIn}
    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {
    return useContext(ProfileContext)
}