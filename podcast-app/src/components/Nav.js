import React from 'react';

import {Link} from "react-router-dom";

const Nav = () => {
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
                <Link to="profile" className="nav-item nav-link">
                    Profile
                </Link>
            </div>
        </nav>
    )
}
export default Nav;