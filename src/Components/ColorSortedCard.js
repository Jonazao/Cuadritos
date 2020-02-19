import React, { Component } from 'react';
import { Segment, Grid, Header, Button, Input } from 'semantic-ui-react';
import './ColorSortedCard.css';

class ColorSortedCard extends Component {
  state = {
    position: ''
  };
  componentDidMount() {
    const { position } = this.props;
    this.setState({ position: position });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.position !== this.state.position &&
      prevProps.position !== this.props.position
    ) {
      this.setState({ position: this.props.position });
    }
  }

  handleOnChange = e => {
    const value = e.target.value;
    this.setState({ position: value });
  };
  handleBlur = e => {
    const { onInputValueChange, id } = this.props;
    const { position } = this.state;
    if (isNaN(position)) {
      this.inputRef.focus();
      onInputValueChange({
        id: null,
        currentValue: '',
        disabled: true
      });
    } else {
      onInputValueChange({
        id: id,
        currentValue: position,
        disabled: false
      });
    }
  };
  handleColorButtonClick = () => {
    const { onColorButtonClick, id } = this.props;
    onColorButtonClick(id);
  };
  render() {
    const { id, color, subcolor, disabled } = this.props;
    const { position } = this.state;
    return (
      <Grid.Row id={id}>
        <Grid.Column width={8}>
          <Segment>
            <Grid centered textAlign="center" columns={1}>
              <Grid.Row color={color}>
                <Grid.Column floated="right" width={7}>
                  <Input
                    ref={input => {
                      this.inputRef = input;
                    }}
                    label={{ icon: 'hashtag' }}
                    labelPosition="left corner"
                    value={position}
                    onBlur={this.handleBlur}
                    onChange={this.handleOnChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row color={color}>
                <Grid.Column textAlign="center" width={14}>
                  <Segment>
                    <Header color={color} as="h3">
                      This is my {color} text
                    </Header>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row color={color}>
                <Grid.Column width={14}>
                  <Button
                    onClick={this.handleColorButtonClick}
                    color={subcolor}
                    fluid
                    disabled={disabled}
                  >
                    {subcolor.toUpperCase()}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default ColorSortedCard;
