import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar justify-content-center">
            <li className="nav-item nav-link">
                <Link to="/">Top Games</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/streams">Top Streams</Link>
            </li>
        </nav>
    )
}

export default Header;