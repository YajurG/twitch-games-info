import React, {Component} from 'react';
import Game from "./game";
import CardDeck from 'react-bootstrap/CardDeck';

class Games extends Component {

  constructor(props){
    super(props);
    this.state = {
      topGames: []
    }
  }

  getTopGames = () => {
      axios.get("http://localhost:8080/games")
      .then((response) => {
        let games = response.games;
        let update = [];
        games.forEach((item) => {
          update.push({id: item.id, name: item.name, imgURL: item.box_art_url})
        });
        this.setState({topGames: update});
        console.log(this.state);
      }).catch((err) => {
        console.log(err);
      })
  }

    render() {
      return (
          <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
            {this.state.topGames.map(game => {
              <Game
                key={game.id}
                value={game.name}
                imgURL={game.imgURL}
              />
            })}
          </CardDeck>
      )
    }
}

export default Games;
