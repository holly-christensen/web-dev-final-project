import React, {useRef} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../contexts/profile-context";

const api = axios.create({withCredentials: true})

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const lastRef = useRef()
    const usernameRef = useRef()
    const firstRef = useRef()
    const phoneRef = useRef()
    const navigate = useNavigate()
    const {signup} = useProfile()
    const handleSignupBtn = async () => {
        try {
            if (usernameRef.current.value.length == 0
                || emailRef.current.value.length == 0 ||
                passwordRef.current.value.length == 0) {
                alert("signup failed - missing required field(s)")
                return;
            }
            await signup(
                usernameRef.current.value,
                emailRef.current.value,
                passwordRef.current.value,
                firstRef.current.value,
                lastRef.current.value,
                phoneRef.current.value
            )
            navigate('/profile')
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <input ref={usernameRef}
                   placeholder="username"
                   type="username"
                   className="form-control"/>
            <br></br>
            <input ref={emailRef}
                   placeholder="email"
                   type="email"
                   className="form-control"/>
            <br></br>
            <input ref={passwordRef}
                   placeholder="password"
                   type="password"
                   className="form-control"/>
            <br></br>
            <input ref={firstRef}
                   placeholder="first name"
                   type="text"
                   className="form-control"/>
            <br></br>
            <input ref={lastRef}
                   placeholder="last name"
                   type="text"
                   className="form-control"/>
            <br></br>
            <input ref={phoneRef}
                   placeholder="XXX-XXXX-XXXX"
                   type="text"
                   className="form-control"/>
            <br></br>
            <button onClick={handleSignupBtn}
                    className="btn btn-primary">
                Signup</button>
        </div>
    );
};

export default Signup;