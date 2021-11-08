import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";


const UserHome = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState();

    useEffect(() => {
        async function getData() {
            let loggedIn = await sessionStorage.getItem("loggedIn");
            if (loggedIn){
                setIsLoggedIn(true);
                const username = await sessionStorage.getItem("username");
                console.log(username);
                setUsername(username)
            } else {
                console.log("not logged in");
            }
        }

        getData();
    }, [])

    const history = useHistory();

    const onClickMyGames = () => {
        if (isLoggedIn) {
            history.push("/") // change to user games url
        }
    }

    const onClickMyStreams = () => {
        if (isLoggedIn) {
            history.push("/") // change to user games url
        }
    }

    return (isLoggedIn) ? (
        <div>
            <h3>Welcome to your Homepage, {username}</h3>
            <div style={styles.wrapper}>
                <Button variant="primary" type="submit" style={styles.button} onClick={onClickMyGames}>
                    My Games
                </Button>
                <Button variant="primary" type="submit" style={styles.button}>
                    My Streams
                </Button>
            </div>
        </div>
    ) : (
        <div>
            <h3>Sorry, you are not authorized to view this page. Please login or register.</h3>
        </div>
    )
}

const styles = {
    wrapper: {
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        margin: "10px 10px 10px 10px"
    }
}

export default UserHome;