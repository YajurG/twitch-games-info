const express = require('express');
const data = require('./controller.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/", (req, res) => {
  res.json({message: "Welcome."});
})

app.post("/api/token", data.getToken)

app.get("/api/topGames", data.getGames)

app.get("/api/topStreams", data.getStreams)

app.get("/api/gamesById", data.getGameByID)

app.listen(8080, () => {
  console.log("Server running on port 8080");
})
