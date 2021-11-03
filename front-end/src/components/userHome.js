import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const UserHome = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState()

    useEffect(() => {
        console.log("do stuff here")
    }, [])

    return (isLoggedIn) ? (
        <div>
            <h3>Welcome to your homepage {username}</h3>
        </div>
    ) : (
        <div>
            <h3>Sorry, you are not authorized to view this page</h3>
        </div>
    )
}

export default UserHome;