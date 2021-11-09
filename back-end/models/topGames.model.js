const mongoose = require('mongoose');
const GameSchema = require('./gameSchema')

const TopGames = mongoose.model(
    "TopGames", GameSchema
);

module.exports = TopGames;