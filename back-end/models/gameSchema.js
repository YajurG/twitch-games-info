const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gameID: {type: String, required: true},
    box_art_url: String
});

module.exports = gameSchema;