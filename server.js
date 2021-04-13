const express = require('express');
const bodyParser = require('body-parser');

const data = require('./controller.js');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({message: "Welcome."});
})

app.get("/token", data.getToken)

app.get("/games", data.getGames)

app.get("/streams/:gameId", data.getStreams)

app.listen(3000, () => {
  console.log("Server running on port 3000");
})
