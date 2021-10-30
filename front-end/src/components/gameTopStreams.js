import React, { useState, useEffect } from 'react';

const GameTopStreams = ({match, location}) => {
    const [streams, setStreams] = useState([]);
    const [viewerCount, setViewerCount] = useState(0);

    useEffect(() => {
        const getData = async () => {
            let token = await localStorage.getItem("twitchToken");
            let queryParams = {
                token: JSON.parse(token),
                // add rest of query params
            }
            const res = await axios.get("http://localhost:8080/api/game/streams", {params: {token: JSON.parse(token)}});
            console.log
        }
    })

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