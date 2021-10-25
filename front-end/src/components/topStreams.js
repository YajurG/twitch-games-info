import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TopStreams = () => {

    // const [streams, setStreams] = useState([]);
    // const [twitchToken, setTwitchToken] = useState();
    // const [isLoading, setIsLoading] = useState();

    // useEffect(() => {
    //     const getTopStreams = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:8080/api/topStreams", {params: {token: JSON.parse(twitchToken), count: 20}})
    //             console.log(res.data)
    //             await setStreams(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
            
    //     }
    //     const getToken = async () => {
    //         let token = await localStorage.getItem("twitchToken");
    //         await setTwitchToken(token)
    //         console.log(twitchToken)
    //     }
    //     getToken();
    //     getTopStreams();
    // }, [])

    return (
        <div>hello what is happening</div>
    )
}

export default TopStreams;