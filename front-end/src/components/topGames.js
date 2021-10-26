import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const TopGames = () => {

    const [games, setGames] = useState([]);
    const [twitchToken, setTwitchToken] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            let token = await localStorage.getItem("twitchToken");
            setTwitchToken(token)
            const res = await axios.get("http://localhost:8080/api/topGames", {params: {token: JSON.parse(token)}});
            console.log(res.data)
            let gameData = res.data.data;
            let final = gameData.map(game => {
                let newURL = game.box_art_url
                    .replace("{width}", "300")
                    .replace("{height}", "300");
                game.box_art_url = newURL;
                return game;
            });
            setGames(final);
            if (games !== []){
                setIsLoading(false)
            }
            console.log(games)
        }
        getData();
    },[])
    
    

    return (!isLoading) ? (
        <div>
            <h1>Top Games on Twitch</h1>
            <div className="row">
            {games.map(game => (
            <div className="col-lg-2 col-md-4 col-sm-12 mt-5">
                <div className="card">
                <img className="card-img-top" src={game.box_art_url} />
                <div className="card-body">
                    <h5 className="card-title">{game.name}</h5>
                    <button className="btn btn-success">
                    <Link
                        className="link"
                        to={{
                        pathname: "game/" + game.name,
                        state: {
                            gameID: game.id
                        }
                        }}
                    >
                        {game.name} streams{" "}
                    </Link>
                    </button>
                </div>
                </div>
            </div>
            ))}
            </div>
        </div>
        //<div> what the fuck</div> 
    ) : (<h1>Loading</h1>)
}

export default TopGames;