import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar justify-content-center">
             <li className="nav-item nav-link">
                <Link to="/">Home</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/top-games">Top Games</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/top-streams">Top Streams</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/login">Login</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to ="/register">Register</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to ="/user-home">User Home</Link>
            </li>
        </nav>
    )
}

export default Header;