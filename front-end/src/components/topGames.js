import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const TopGames = () => {
    const [games, setGames] = useState([]);
    const [twitchToken, setTwitchToken] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                let token = await localStorage.getItem("twitchToken");
                setTwitchToken(token);
                const res = await axios.get("http://localhost:8080/api/topGames", {params: {token: JSON.parse(token)}});
                setGames(res.data.data);
                console.log("games: " + games)
                console.log("token: " + token)
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [])
    
    

    return (
        <div>
            <h1>Top Games on Twitch</h1>
            <div className="row">
            {games.map(game => {
                <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                <div className='card'>
                    <img className='card-image-top' src={game.box_art_url} />
                    <div className="card-body">
                        <h5 className="card-title">{game.name}</h5>
                        <button className="btn btn-success">
                        </button>
                    </div> 
                </div>
            </div>
            })}
            </div>
        </div>
        //<div> what the fuck</div>
    )
}

export default TopGames;