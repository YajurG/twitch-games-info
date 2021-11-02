const twitchController = require("../controllers/twitch.controller");

module.exports = (app) => {
    app.post("/api/token", twitchController.getToken)
    app.get("/api/topGames", twitchController.getGames)
    app.get("/api/topStreams", twitchController.getStreams)
    app.get("/api/gamesById", twitchController.getGameByID)
    app.get("/api/game/streams", twitchController.getStreamsByGame)
}