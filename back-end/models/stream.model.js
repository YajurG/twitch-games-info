const mongoose = require("mongoose")

const streamSchema = new mongoose.Schema({
    username: {type: String, required: true},
    game: mongoose.Schema.Types.ObjectId,
    thumbnail_url: String,
    viewerCount: Number 
})

const Stream = mongoose.model(
    "Stream", streamSchema
)

module.exports = Stream;