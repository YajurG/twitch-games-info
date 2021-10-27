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
            <div className="row">
                <h3>Click a link above!</h3>
            </div>
        </div>
    )
}

export default Home;