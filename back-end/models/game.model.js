const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gameID: {type: String, required: true},
    art_url: String,
});

const Game = mongoose.model(
    "Game", gameSchema
);

module.exports = Game;