import React, { useEffect, useState } from 'react';

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
            <h3>This is the user games page</h3>
            {isGameData ? (
                <div>
                    {games.map((game, idx) => {
                        // map cards in the same format
                    })}
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
    header: {

    }
}