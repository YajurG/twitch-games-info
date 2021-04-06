require('dotenv').config();
const request = require('request');

var access_token = "HELLO";

const getAccessToken = (url, callback) => {
    const options = {
      url: url,
      json: true,
      body: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "client_credentials"
      }
    }

    request.post(options, (err, res) => {
      if (err) {
        console.log(err);
      }
      callback(res);
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

    request.get(options, (err, res) => {
      if (err) {
        console.log(err);
      }
      callback(res);
    })
}

getAccessToken(process.env.GET_TOKEN, (res) => {
    access_token = res.body.access_token;
    return access_token;
})

setTimeout(() => {
  getGames(process.env.GET_GAMES, (res) => {
      data = res.body.data;
      for (i = 0; i < data.length; i++) {
          console.log(data[i].name);
      }
  }, access_token)
}, 1000)
