const { default: axios } = require("axios");
const Index = require("./index.js");
const config = require("./config/api.config")

exports.getGames = async (req, res) => {

  const token = req.query.token;
  const url = "https://api.twitch.tv/helix/games/top"
  const headers = {
    'Client-ID': config.client_id,
    "Authorization": "Bearer " + token
  }
  
  try {
    let response = await axios.get(url, {headers: headers});
    console.log(response.data);
    res.send({data: response.data.data, pagination: response.data.pagination});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({error: err});
  }
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
}

// returns most active streams across all games
exports.getStreams = async (req, res) => {
  const token = req.query.token;
  const count = req.query.count ? req.query.count: 20;
  if (req.query.count > 100) {
    res.status(500).send({message: "Error. Cannot request more than 100 streams."})
  }
  
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
    //console.log(streams.data)
    res.send({data: streams.data.data})
  } catch (err) {
    console.log(err.message);
    res.status(500).send({error: err});
  }
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

exports.getGameByID = async (req, res) => {
  const token = req.query.token;
  const ids = JSON.parse(req.query.id);
  //console.log("ID: " + ids)
  const url = "https://api.twitch.tv/helix/games?";
  let queryParams = "";
  ids.map(id => {
    return (queryParams += `id=${id}&`);
  })
  const finalURL = url + queryParams;
  console.log(finalURL);
  const headers = {
    'Client-ID': config.client_id,
    "Authorization": "Bearer " + token
  }

  try {
    const response = await axios.get(finalURL, {headers: headers});
    gameData = response.data.data;
    console.log(gameData)
    res.send({data: gameData});
  } catch (err) {
    console.log(err.message)
    res.status(500).send({error: err.message})
  }
}