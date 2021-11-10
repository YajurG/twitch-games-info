const mongoose = require("mongoose");

const db = {}

db.mongoose = mongoose;

db.user = require("./user.model");
db.game = require("./game.model");
db.stream = require("./stream.model");
db.topGames = require("./topGames.model")
db.topStreams = require("./topStreams.model");

module.exports = db;