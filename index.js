require('dotenv').config();
const axios = require('axios');


  exports.getAccessToken = (url, callback) => {

    const options = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials"
    }
    axios.post('https://id.twitch.tv/oauth2/token?client_id='+options.client_id+'&client_secret='+options.client_secret+'&grant_type=client_credentials')
    .then((response) =>{
        console.log(response.data.access_token)
        let access_token = {token: response.data.access_token}
        callback(null, access_token);
        //exports.getGames(process.env.GET_GAMES, exports.getGamesCallback, access_token)
    })
    .catch((err) => {
        console.log(err);
        callback(err, null);
    })
}

exports.getGames = (url, token, callback) => {
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
        data = response.data.data;
        let games = [];
        for (i = 0; i < data.length; i++) {
            games.push(data[i]);
        }
        let gamesResult = {games: games};
        callback(null, gamesResult)
    }).catch((err) => {
        console.log(err);
        callback(err, null);
    })
}

exports.getGamesCallback = (res) => {
    data = res.data.data;
    let games = [];
    for (i = 0; i < data.length; i++) {
        games.push(data[i]);
        console.log(data[i]);
    }
    return games;
}
