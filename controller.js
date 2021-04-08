const Index = require("./index.js");

exports.getToken = (req, res) => {
  let token = Index.getAccessToken(process.env.GET_TOKEN,
    (err, result) => {
      if (err){
        res.status(500).send({
          message: "Some error occurred while retrieving token."
        });
      } else {
        let games = Index.getGames(process.env.GET_GAMES, result.token,
          (err, result) => {
            if (err){
              res.status(500).send({
                message: "Some error occurred while retrieving games."
              });
            } else {
                res.send(result);
            }
          }
        )
      }
    })
}
