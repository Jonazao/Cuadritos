import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid } from 'semantic-ui-react';
import ColorSortedCart from './ColorSortedCard';

class App extends Component {
  state = {
    disabled: false,
    cards: [
      {
        id: 'blue',
        position: 1,
        color: 'blue',
        subcolor: 'orange'
      },
      {
        id: 'green',
        position: 2,
        color: 'green',
        subcolor: 'blue'
      },
      {
        id: 'orange',
        position: 3,
        color: 'orange',
        subcolor: 'green'
      }
    ]
  };

  onColorButtonClick = cardId => {
    const cards = this.getNewCards(cardId);
    this.setState({ cards: cards });
  };

  getNewCards = cardId => {
    const { cards } = this.state;
    let selectedCard = cards.find(c => c.id === cardId);
    const selectedPosition = selectedCard.position;
    let swappedCard = cards.find(c => c.id === selectedCard.subcolor);
    const swappedPosition = swappedCard.position;
    selectedCard.position = swappedPosition;
    swappedCard.position = selectedPosition;
    cards.sort((a, b) => {
      if (a.position > b.position) {
        return 1;
      }
      return -1;
    });
    return cards;
  };
  onInputValueChange = value => {
    const { cards } = this.state;
    if (value.id) {
      let selectedCard = cards.find(c => c.id === value.id);
      selectedCard.position = value.currentValue;
      cards.sort((a, b) => {
        if (a.position > b.position) {
          return 1;
        }
        return -1;
      });
      this.setState({ cards: cards, disabled: value.disabled });
    } else {
      this.setState({ disabled: value.disabled });
    }
  };

  renderCards = () => {
    const { cards, disabled } = this.state;
    return cards.map(c => {
      return (
        <ColorSortedCart
          key={c.id}
          id={c.id}
          onColorButtonClick={this.onColorButtonClick}
          onInputValueChange={this.onInputValueChange}
          position={c.position}
          color={c.color}
          disabled={disabled}
          subcolor={c.subcolor}
        />
      );
    });
  };
  render() {
    return (
      <Container>
        <Grid padded centered>
          {this.renderCards()}
        </Grid>
      </Container>
    );
  }
}

export default App;
