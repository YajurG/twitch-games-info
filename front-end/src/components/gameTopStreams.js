import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameTopStreams = ({match, location}) => {
    const [streams, setStreams] = useState([]);
    const [totalViewerCount, setTotalViewerCount] = useState("");

    useEffect(() => {
        const getData = async () => {
            let token = JSON.parse(await localStorage.getItem("twitchToken"));
            let queryParams = {
                token: token,
                id: location.state.gameID
            }
            //console.log(queryParams);
            const res = await axios.get("http://localhost:8080/api/game/streams", {params: queryParams});
            let streamDataArray = res.data.data;
            let finalData = streamDataArray.map(stream => {
                let newThumbnail = stream.thumbnail_url
                    .replace("{width}", "300")
                    .replace("{height}", "300")
                stream.thumbnail_url = newThumbnail;
                return stream;
            })
            console.log(finalData);
            let count = streamDataArray.reduce((previous, current) => {
                return previous + current.viewer_count
            },0)
            setStreams(finalData);
            setTotalViewerCount(count.toLocaleString());
        }
        getData();
    }, [])

    return (
        <div>
            <h1 className="center">{match.params.id}</h1>
            <h3 className="center" style={{padding: "15px"}}>
                <b>{totalViewerCount}</b> viewers currently watching
            </h3>
            <div className="row">
                {streams.map(stream => (
                    <div className="col-lg-2 col-md-4 col-sm-12 mt-5">
                    <div className="card">
                      <img className="card-img-top" src={stream.thumbnail_url} />
                      <div className="card-body">
                        <h3 className="card-title">{stream.user_name}</h3>
                        <h5 className="card-text"> {stream.gameName}</h5>
                        <div className="card-text">
                          {stream.viewer_count} live viewers
                        </div>
                        <button className="btn btn-success">
                          <a
                            href={"https://twitch.tv/" + stream.user_name}
                            className="link"
                            target="_blank"
                          >
                            watch {stream.user_name}'s' stream
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
        // <div>
        //     <li>
        //         {match.params.id}
        //     </li>
        //     <li>
        //         {location.state.gameID}
        //     </li>
        // </div>
    )
}

export default GameTopStreams;