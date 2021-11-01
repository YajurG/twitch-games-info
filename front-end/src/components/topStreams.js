import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./streams.css";

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
            let dataArray = streamData.map(stream => {
                let newURL = stream.thumbnail_url
                    .replace("{width}", "300")
                    .replace("{height}", "300");
                stream.thumbnail_url = newURL;
                return stream;
            });
            let gameUrl = "http://localhost:8080/api/gamesById";
            const queryParams = {
                token: JSON.parse(token)
            }
            let id = []
            dataArray.map(stream => {
                if (!id.includes(stream.game_id)){
                    id.push(stream.game_id);
                }
            })
            queryParams.id = JSON.stringify(id);
            console.log(queryParams);
            let gameNameData = await axios.get(gameUrl, {params: queryParams});
            let games = gameNameData.data.data;
            //console.log(final);
            setStreams(dataArray);
            
            if (streams !== []) {
                setIsLoading(false);
            }
            // need to make second api call to get game name for each stream
               
    }
    getData();
    }, [])

    return (!isLoading) ? (
        <div>
            <h1>Top Streams on Twitch</h1>
            <div className='row'>
                {streams.map(stream => (
                    <div className="col-lg-2 col-md-4 col-sm-12 mt-5">
                    <div className="card">
                      <img className="card-img-top" src={stream.thumbnail_url} />
                      <div className="card-body">
                        <h3 className="card-title">{stream.user_name}</h3>
                        <h5 className="card-text"> {stream.game_name}</h5>
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
    ) : <h1>Loading</h1>
}

export default TopStreams;