import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {createUser} from "../actions/user-actions";
import {useDispatch} from "react-redux";
import * as service from "../actions/user-actions";
//import {signupUser} from "../services/user-service";

const ProfileContext = React.createContext()

const api = axios.create({withCredentials: true})

export const ProfileProvider = ({children}) => {
    const [profile, setProfile]
        = useState({})

    // useEffect(async () => {
    //     const user = await service.profile();
    //     setProfile(user);
    // }, []);


    const signout = async () => {
        const response = await api
            .post("http://localhost:4000/api/signout")
        setProfile(null)
    }

    const checkLoggedIn = async () => {
        console.log("in check logged in")
        try {
            const response = await api
                .post("http://localhost:4000/api/profile")
            console.log("response")
            console.log(response.data)
            setProfile(response.data)
            return response.data
        } catch (e) {
            throw e
        }
    }
    const dispatch = useDispatch();

    const signup = async (username, email, password, firstname, lastname, phonenumber) => {
        // const userDetails = {
        //     'username': username,
        //     'password': password,
        //     'email': email,
        //     'firstname': firstname,
        //     'lastname': lastname,
        //     'phoneNumber': phonenumber
        // }
        // console.log(userDetails)
        //
        // let response = undefined;
        // try {
        //     response = await createUser(dispatch, userDetails);
        //     console.log(response)
        //     setProfile(response._id)
        //     console.log(profile)
        //
        // } catch (e) {
        //     throw e
        // }
        // console.log("made it past the try")
        // console.log(response)
        // setProfile(response._id)
        // console.log(profile)

        try { // TODO: move this to service
            const response = await api
                .post("http://localhost:4000/api/signup",
                    { email, password })
            setProfile(response.data)
            console.log(response)
            console.log(profile)
        } catch (e) { throw e }
    }


    const signin = async (email, password) => {
        try {
            const response = await api
                .post("http://localhost:4000/api/signin",
                    {email, password})
            setProfile(response.data)
            console.log(response)
            console.log(profile)
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