import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const TopGames = () => {

    const [games, setGames] = useState([]);
    const [twitchToken, setTwitchToken] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        const getData = async () => {
            let token = await localStorage.getItem("twitchToken");
            console.log(token)
            setTwitchToken(token)
            const res = await axios.get("http://localhost:8080/api/games/top", {params: {token: JSON.parse(token)}});
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
    
    const addToUserGames = async (game) => {
        console.log(game)
        let userGames = await JSON.parse(localStorage.getItem("userGameData"));
        if (!userGames) {
            userGames = [];
        }
        console.log(userGames);
        const containsGame = userGames.some((elem) => (elem.name === game.name))
        containsGame ? console.log("game already in user game data") : userGames.push(game)
        await localStorage.setItem("userGameData", JSON.stringify(userGames))
    }
    

    return (!isLoading) ? (
        <div>
            <h1>Top Games on Twitch</h1>
            <div className="row">
            {games.map((game, idx) => (
            <div className="col-lg-2 col-md-4 col-sm-12 mt-5">
                <div className="card">
                <img className="card-img-top" src={game.box_art_url} />
                <div className="card-body">
                    <h5 className="card-title">{game.name}</h5>
                    <button className="btn btn-success" style={styles.button}>
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
                    <button className="btn btn-success" style={styles.button} onClick={() => addToUserGames(game)}>
                        Add to My Games
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

const styles = {
    button: {
        margin: "5px 5px 5px 5px"
    }
}