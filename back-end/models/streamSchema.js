const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    game_id: String,
    game_name: String,
    thumbnail_url: String,
    viewer_count: Number 
})

module.exports = streamSchema;