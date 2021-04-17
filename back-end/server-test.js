const axios = require('axios');
require('dotenv').config();

test = () => {
  axios.get(process.env.BASE_URL + "/games")
    .then((response) => {
        let games = response.data.games;
        let game_ids = {};
        games.forEach(game => game_ids[game.name] = game.id);
        console.log(game_ids)
    }).catch((err) => {
        console.log(err)
    })
}

test();
