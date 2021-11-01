import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [twitchToken, setTwitchToken] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getToken = async () => {
            //localStorage.clear();
            let token = await localStorage.getItem("twitchToken")
            if (!token) {
                let tokenData = await axios.post("http://localhost:8080/api/token");
                token = tokenData.data.token;
                await localStorage.setItem("twitchToken", JSON.stringify(token))
            }
            console.log(token)
            console.log(localStorage);
            setIsLoading(false)
        }
        getToken()
    }, [])

    return (isLoading) ? (
        <div>
            <h1>Home</h1>
        </div>
    ) : (
        <div>
            <h1>Home</h1>
            <div className="row" style={{padding: "10px"}}>
                <h3>Welcome to Twitch Assistant!</h3>
            </div>
            <div className="row">
                <b>Click one of the links above</b>
            </div>
        </div>
    )
}

export default Home;