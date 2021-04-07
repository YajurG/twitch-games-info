require('dotenv').config();
const request = require('request');
const axios = require('axios');

var access_token = "HELLO";
var games = [];

const getAccessToken = (url, callback) => {

    const options = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials"
    }
    axios.post('https://id.twitch.tv/oauth2/token?client_id='+options.client_id+'&client_secret='+options.client_secret+'&grant_type=client_credentials')
    .then((response) =>{
        console.log(response.data);
        callback(response)
        getGames(process.env.GET_GAMES, getGamesCallback, access_token)
    })
    .catch((err) => {
        console.log(err);
    })
}

const getGames = (url, callback, token) => {
    const options = {
        url: url,
        json: true,
        method: 'GET',
        headers: {
          'Client-ID': process.env.CLIENT_ID,
          "Authorization": "Bearer " + token
        }


    }
    axios.get(url, {
        headers: {
          'Client-ID': process.env.CLIENT_ID,
          "Authorization": "Bearer " + token
        }
    }).then((response) => {
        callback(response);
    }).catch((err) => {
        console.log(err);
    })
}

const getGamesCallback = (res) => {
    data = res.data.data;
    for (i = 0; i < data.length; i++) {
        games.push(data[i]);
        console.log(data[i]);
    }
    return games;
}

getAccessToken(process.env.GET_TOKEN, (res) => {
    console.log(res.data.access_token)
    access_token = res.data.access_token;
    return access_token;
})

/*setTimeout(() => {
  getGames(process.env.GET_GAMES, (res) => {
      data = res.body.data;
      for (i = 0; i < data.length; i++) {
          games.push(data[i]);
          console.log(data[i].name);
      }
      return games;
  }, access_token)
}, 1000)*/
