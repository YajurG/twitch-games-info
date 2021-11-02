const express = require('express');
const dbConfig = require("./config/db.config")

const passport = require('passport');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/strategies.config")(passport);

const db = require("./models");

db.mongoose.connect(dbConfig.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to db.");
  })
  .catch((err) => {
    console.error("Error when connecting to db", err);
    process.exit();
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.json({message: "Welcome."});
})

require("./routes/twitch.routes")(app);
require("./routes/auth.routes")(app);

app.listen(8080, () => {
  console.log("Server running on port 8080");
})
