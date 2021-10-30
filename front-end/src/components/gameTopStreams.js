import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameTopStreams = ({match, location}) => {
    const [streams, setStreams] = useState([]);
    const [viewerCount, setViewerCount] = useState(0);

    useEffect(() => {
        const getData = async () => {
            let token = JSON.parse(await localStorage.getItem("twitchToken"));
            let queryParams = {
                token: token,
                id: location.state.gameID
            }
            //console.log(queryParams);
            const res = await axios.get("http://localhost:8080/api/game/streams", {params: queryParams});
            let streamData = res.data.data;
            setStreams(streamData);
            console.log(streamData);
        }
        getData();
    }, [])

    return (
        <div>
            <li>
                {match.params.id}
            </li>
            <li>
                {location.state.gameID}
            </li>
        </div>
    )
}

export default GameTopStreams;