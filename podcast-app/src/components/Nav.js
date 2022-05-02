import React from 'react';

import {Link} from "react-router-dom";
import {useProfile} from "../contexts/profile-context";

const Nav = () => {
    const {profile} = useProfile()
    const signedIn = profile && Object.keys(profile).length > 0
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link to="/home" className="navbar-brand ps-4">
                Podcast App
            </Link>
            <div className="navbar-nav">
                <Link to="home" className="nav-item nav-link">
                    Home
                </Link>
                <Link to="podcasts" className="nav-item nav-link">
                    Search
                </Link>
                {signedIn &&
                    <Link to="profile" className="nav-item nav-link">
                        Profile
                    </Link>}
                {signedIn &&
                    <Link to="signOut" className="nav-item nav-link">
                        Sign Out
                    </Link>
                }
                {!signedIn &&
                    <Link to="signIn" className="nav-item nav-link">
                        Sign In
                    </Link> }
                {!signedIn &&
                    <Link to="signUp" className="nav-item nav-link">
                    Sign Up
                    </Link>
                }
            </div>
        </nav>
    )
}
export default Nav;