const { default: axios } = require("axios");
const Index = require("./index.js");
const config = require("./config/api.config")

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
exports.getToken = async (req, res) => {
  const options = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_type: "client_credentials"
  }
  try {
    let response = await axios.post('https://id.twitch.tv/oauth2/token', {}, {params: options});
    let access_token = {token: response.data.access_token,
                        expires_in: response.data.expires_in}
    res.send(access_token)

  } catch (err) {
    console.log(err.message)
    res.status(500).send({error: err})
  }
  
  /*let token = Index.getAccessToken(process.env.GET_TOKEN,
    (err, result) => {
      if (err){
        res.status(500).send({
          message: "Some error occurred while retrieving a token."
        });
      } else {
          res.send(result);
      }
    })*/
}

// returns most active streams across all games
exports.getStreams = async (req, res) => {
  const token = req.params.token;
  const count = req.params.count ? req.params.count: 10;
  const url = "https://api.twitch.tv/helix/streams";
  const headers = {
    'Client-ID': config.client_id,
    "Authorization": "Bearer " + token
  }
  const options = {
    first: count
  }

  try {
    const streams = await axios.get(url, {headers: headers, params: options});
    res.send(streams)
  } catch (err) {
    console.log(err.message);
    res.status(500).send({error: err});
  }
  
  exports.getStreamsByGame = async (req, res) => {
    const token = req.params.token;
    const id = req.param.gameID;
    const count = req.params.count ? req.params.count: 10;
    const url = "https://api.twitch.tv/helix/streams";
    const headers = {
      'Client-ID': config.client_id,
      "Authorization": "Bearer " + token
    }
    const options = {
      first: count,
      game_id: id
    }
    
    try {
      const streams = await axios.get(url, {headers: headers, params: options});
      res.send(streams);
    } catch (err) {
      res.status(500).send({error: err});
    }
  }
  // let token  = Index.getAccessToken(process.env.GET_TOKEN,
  //   (err, result) => {
  //     if (err){
  //       res.status(500).send({
  //         message: "Some error occurred while retrieving token."
  //       });
  //     } else {
  //       let streams = Index.getStreams(process.env.GET_STREAMS, req.params.gameId, result.token, req.params.numOfStreams,
  //         (err, result) => {
  //           if (err){
  //             res.status(500).send({
  //               message: "Some error occurred while retrieving streams."
  //             });
  //           } else {
  //             res.send(result);
  //           }
  //         }
  //       )
  //     }
  //   }
  // )
}
