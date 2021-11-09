const axios = require('axios');

const db = require("../models");
const Game = db.game;
const TopGames = db.topGames;

exports.updateTopGames = async (req, res) => {
    // call twitch api here and store popular games in db
    // client will call this api instead of twitch api directly
    try {
        const url = "http://localhost:8080/api/topGames"
        const token = req.query.token;
        const response = await axios.get(url, {params: {token: token}});
        //console.log(response.data)
        const topGames = response.data.data;
        const newTopGames = topGames.map(({
            id: gameID,
            ...rest
        }) => ({
            gameID,
            ...rest
        }))
        console.log(newTopGames)
        const deleteResult = await TopGames.deleteMany({});
        if (deleteResult.deletedCount === 0) {
            console.log("no items deleted")
        }
        const updateResult = await TopGames.insertMany(newTopGames);
        res.send({message: "top games updated", data: updateResult});
    } catch (err) {
        console.log(err);
        res.status(500).send({error: "error occurred"})
    }
}

