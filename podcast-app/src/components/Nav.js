import React from 'react';

import {Link, Routes} from "react-router-dom";

const Nav = () => {
    return(
        <div className="list-group">
            <Link to="/" className="list-group-item">
                Home
            </Link>
            <Link to="search" className="list-group-item">
                Search
            </Link>
            <Link to="profile" className="list-group-item">
                Search
            </Link>
            <Link to="signin" className="list-group-item">
                SignIn
            </Link>
            <Link to="signout" className="list-group-item">
                SignOut
            </Link>
            <Link to="signup" className="list-group-item">
                SignUp
            </Link>
        </div>
    )
}
export default Nav;