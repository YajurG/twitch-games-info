const mongoose = require('mongoose');
const GameSchema = require('./gameSchema')

const Game = mongoose.model(
    "Game", GameSchema
);

module.exports = Game;