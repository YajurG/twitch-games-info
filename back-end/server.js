const express = require('express');

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

require("./routes/twitch.routes");
require("./routes/auth.routes");

app.listen(8080, () => {
  console.log("Server running on port 8080");
})
