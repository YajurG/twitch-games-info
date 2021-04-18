import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.key,
      name: this.props.value,
      imgURL: this.props.imgURL
    }
  }

  render() {
    return (
      <Card style={{width: '18rem'}}>
        <Card.Body>
          <Card.Title as="h3">{this.state.name}</Card.Title>
          <Card.Subtitle className="text-muted"> Viewer Count: {this.state.viewer_count} </Card.Subtitle>
          <Card.Text>
            Currently streaming {this.state.title}
          </Card.Text>
          <Card.Link href="#"> Go to stream </Card.Link>
        </Card.Body>
      </Card>
    )
  }
}

export default Game;
