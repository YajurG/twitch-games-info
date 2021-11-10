const streamController = require("../controllers/streams.controller");

module.exports = (app) => {
    app.post("/api/streams/top", streamController.updateTopStreams);
    app.get("/api/streams/top", streamController.getTopStreams);
}