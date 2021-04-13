const Index = require("./index.js");

exports.getGames = (req, res) => {

  let token = Index.getAccessToken(process.env.GET_TOKEN,
    (err, result) => {
      if (err){
        res.status(500).send({
          message: "Some error occurred while retrieving token."
        });
      } else {
        let games = Index.getGamesInfo(process.env.GET_GAMES, result.token,
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
exports.getToken = (req, res) => {
  console.log(req);
  let token = Index.getAccessToken(process.env.GET_TOKEN,
    (err, result) => {
      if (err){
        res.status(500).send({
          message: "Some error occurred while retrieving a token."
        });
      } else {
          res.send(result);
      }
    })
}


exports.getStreams = (req, res) => {
  let token  = Index.getAccessToken(process.env.GET_TOKEN,
    (err, result) => {
      if (err){
        res.status(500).send({
          message: "Some error occurred while retrieving token."
        });
      } else {
        let streams = Index.getStreams(process.env.GET_STREAMS, req.params.gameId, result.token,
          (err, result) => {
            if (err){
              res.status(500).send({
                message: "Some error occurred while retrieving streams."
              });
            } else {
              res.send(result);
            }
          }
        )
      }
    }
  )
}
