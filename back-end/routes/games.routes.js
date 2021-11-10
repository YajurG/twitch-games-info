const gameController = require("../controllers/games.controller");

module.exports = (app) => {
    app.post("/api/games/top", gameController.updateTopGames);
    app.get("/api/games/top", gameController.getTopGames);
}