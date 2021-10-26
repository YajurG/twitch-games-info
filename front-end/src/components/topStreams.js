import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TopStreams = () => {

    const [streams, setStreams] = useState([]);
    const [twitchToken, setTwitchToken] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       const getData = async () => {
            const token = await localStorage.getItem("twitchToken");
            setTwitchToken(token)
            const res = await axios.get("http://localhost:8080/api/topStreams", {params: {token: JSON.parse(token)}});
            console.log(res.data);
            let streamData = res.data.data;
            let final = streamData.map(game => {
                let newURL = game.thumbnail_url
                    .replace("{width}", "300")
                    .replace("{height}", "300");
                game.box_art_url = newURL;
                return game;
            });
            setStreams(final);
            if (streams != []) {
                setIsLoading(false);
            }
            // need to make second api call to get game name for each stream
               
    }
    getData();
    }, [])

    return (!isLoading) ? (
        <div>
            <h1>Top Streams on Twitch</h1>
        </div>
    ) : <h1>Loading</h1>
}

export default TopStreams;