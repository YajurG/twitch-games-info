import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";


const UserHome = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState();
    const [redirectError, setRedirectError] = useState(false);

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
            history.push("/user-games") // change to user games url
        } else {
            setRedirectError(true); // alert user of error
        }
    }

    const onClickMyStreams = () => {
        if (isLoggedIn) {
            history.push("/user-streams") // change to user games url
        } else {
            setRedirectError(true); // alert user of error
        }
    }

    return (isLoggedIn) ? (
        <div>
            <h3>Welcome to your Homepage, {username}</h3>
            <div style={styles.wrapper}>
                <Button variant="primary" type="submit" style={styles.button} onClick={onClickMyGames}>
                    My Games
                </Button>
                <Button variant="primary" type="submit" style={styles.button} onClick={onClickMyStreams}>
                    My Streams
                </Button>
            </div>
            {redirectError && <div style={styles.message}>Error occurred when trying to redirect.</div>}
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
    },
    message:{
        marginTop: "10px"
    }
}

export default UserHome;