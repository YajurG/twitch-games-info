import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TopGames = () => {
    const [games, setGames] = useState([]);
    const [twitchToken, setTwitchToken] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        const getTopGames = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/topGames", {params: {token: twitchToken}})
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
            
        }
        const getToken = async () => {
            let token = await localStorage.getItem("twitchToken");
            await setTwitchToken(token)
            console.log(twitchToken)
        }
        getToken();
        getTopGames();
    })
    
    

    return (
        <div>component for top games</div>
    )
}

export default TopGames;