import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserGames = () => {
    
    const [games, setGames] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);
    const [isGameData, setIsGameData] = useState(false);

    useEffect(() => {
        const gameData = JSON.parse(localStorage.getItem("userGameData"));
        console.log(gameData);
        if (gameData) {
            setIsGameData(true);
            setGames(gameData);
        } else {
            setIsGameData(false);
            console.log("no game data found");
        }
    }, [])
    
    return (
        <div>
            <h3>Welcome to your games!</h3>
            {isGameData ? (
                <div className="row">
                    {games.map((game, idx) => (
                        <div className="col-lg-2 col-md-3 col-sm-12 mt-5">
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
                                Get Streams
                            </Link>
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <div>data not found</div>
            )}
        </div>
    )
    
    // return (isGameData) ? (
    //     <div>
    //         <h3>This is the user games page</h3>
    //     </div>
    // ) : (
    //     <div>
    //         <h3>This is the user games page</h3>
    //         <div><b>No game data was found</b></div>
    //     </div>
    //)

}

export default UserGames;

const styles = {
    button: {
        margin: "5px 5px 5px 5px",
        width: "fitContent"
    },
}