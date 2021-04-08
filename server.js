const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({message: "Welcome."});
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
})
