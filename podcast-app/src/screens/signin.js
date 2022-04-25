import React, {useRef} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useProfile} from "../contexts/profile-context";

const api = axios.create({
    withCredentials: true
});

const Signin = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signin} = useProfile()
    const handleSigninBtn = async () => {
        try {
            // await api.post("http://localhost:4000/api/signin", {
            //   email: emailRef.current.value,
            //   password: passwordRef.current.value
            // })
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            )
            console.log('signed in... now navigating to profile')
            navigate('/profile')
        } catch (e) {
            alert('oops')
        }
    }
    return (
        <div>
            <h1>Signin</h1>
            <input
                ref={emailRef}
                placeholder="email"
                type="email"
                className="form-control"
            />
            <br></br>
            <input
                ref={passwordRef}
                placeholder="password"
                type="password"
                className="form-control"
            />
            <br></br>
            <button
                onClick={handleSigninBtn}
                className="btn btn-primary">
                Signin
            </button>
            <Link className="float-end" to="/signup">
                Signup
            </Link>
        </div>
    );
};

export default Signin;