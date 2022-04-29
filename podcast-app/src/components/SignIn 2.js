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
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            )
            navigate('/profile')
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <h1>SignIn</h1>
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
                SignIn
            </button>
            <Link className="float-end" to="/signup">
                Signup
            </Link>
        </div>
    );
};

export default Signin;