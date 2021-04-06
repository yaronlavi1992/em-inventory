import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Icon,
  ButtonGroup,
  Grid,
  List,
  Accordion,
} from 'semantic-ui-react';
import { addItemQuantity, reduceItemQuantity } from '../actions';

class ListContainer extends Component {
  state = { activeIndex: null };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  addQuantityHandler(itemId) {
    this.props.addItemQuantity(itemId);
  }

  reduceQuantityHandler(itemId) {
    this.props.reduceItemQuantity(itemId);
  }

  renderList() {
    const { activeIndex } = this.state;
    return this.props.items.map((item, index) => {
      return (
        <List.Item key={item.id}>
          <Accordion>
            <Accordion.Title
              active={activeIndex === index}
              index={index}
              onClick={this.handleClick}
            >
              <Grid
                container
                doubling
                divided='vertically'
                verticalAlign='middle'
                centered
                style={{ padding: '0px', margin: '0px' }}
              >
                <Grid.Row columns={this.props.isSpecialItems ? 4 : 2}>
                  <Grid.Column>
                    <Icon name={item.icon} />
                    {item.name}
                  </Grid.Column>

                  {this.props.isSpecialItems && (
                    <>
                      <Grid.Column></Grid.Column>
                      <Grid.Column textAlign='right'>
                        ${item.packageFee}
                      </Grid.Column>
                    </>
                  )}

                  <Grid.Column textAlign='right'>
                    {item.quantity === 0 ? (
                      <Button onClick={() => this.addQuantityHandler(item.id)}>
                        ADD
                      </Button>
                    ) : (
                      <ButtonGroup>
                        <Button
                          icon
                          onClick={() => this.reduceQuantityHandler(item.id)}
                        >
                          <Icon name='minus' />
                        </Button>
                        <Button disabled>{item.quantity}</Button>
                        <Button
                          icon
                          onClick={() => this.addQuantityHandler(item.id)}
                        >
                          <Icon name='plus' />
                        </Button>
                      </ButtonGroup>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>

            <Accordion.Content active={activeIndex === index}>
              <p>I'm the content!</p>
            </Accordion.Content>
          </Accordion>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <List celled divided verticalAlign='middle'>
        {this.renderList()}
        <List.Item>
          <Grid
            container
            doubling
            divided='vertically'
            verticalAlign='middle'
            centered
            style={{ padding: '0px', margin: '0px' }}
          >
            <Grid.Row columns={2}>
              <Grid.Column>BOXES</Grid.Column>

              <Grid.Column textAlign='right'>
                <Link
                  to={`/${this.props.userToken}/box-calculator`}
                  style={{ fontSize: '3vw' }}
                >
                  BOX CALCULATOR
                </Link>
              </Grid.Column>
              <p style={{ fontSize: '2.6vw' }}>
                Don't worry about getting the number of boxes just right. Your
                final shipment weight will be calculated on the day of your
                move.
              </p>
            </Grid.Row>
          </Grid>
        </List.Item>
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
  };
};

export default connect(mapStateToProps, {
  addItemQuantity,
  reduceItemQuantity,
})(ListContainer);
