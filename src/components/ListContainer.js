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
  Image,
  Header,
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

  renderCategories() {
    const uniqueCategories = [
      ...new Set(this.props.items.map((item) => item.type_name)),
    ]; // get unique categories

    return uniqueCategories.map((category) => {
      return (
        <>
          {!this.props.isMyItems && (
            <List.Item key={category}>
              <Header>{category}</Header>
            </List.Item>
          )}
          {this.renderList(
            // render each category header followed by its items
            this.props.items.filter((item) => {
              return item.type_name === category;
            })
          )}
        </>
      );
    });
  }

  renderList(items) {
    const { activeIndex } = this.state;
    return items.map((item, index) => {
      return (
        <List.Item key={item.parent_name}>
          {/* <List.Item key={item.id}> */}
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
                style={{ padding: '0px' }}
              >
                <Grid.Row columns={this.props.isSpecialItems ? 4 : 2}>
                  <Grid.Column>
                    <div
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      {/* <Icon name={item.icon} /> */}
                      <Image
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '10px',
                        }}
                        src={`${process.env.PUBLIC_URL}/assets/${item.icon}`}
                      />
                      {item.parent_name}
                      {/* {item.name} */}
                    </div>
                  </Grid.Column>

                  {this.props.isSpecialItems && (
                    <>
                      <Grid.Column></Grid.Column>
                      <Grid.Column textAlign='right'>
                        {/* ${item.packageFee} */}
                      </Grid.Column>
                    </>
                  )}

                  <Grid.Column textAlign='right'>
                    {item.quantity === 0 ? (
                      <Button
                        onClick={() =>
                          this.addQuantityHandler(item.parent_name)
                        }
                      >
                        {/* <Button onClick={() => this.addQuantityHandler(item.id)}> */}
                        ADD
                      </Button>
                    ) : (
                      <ButtonGroup>
                        <Button
                          icon
                          onClick={() =>
                            this.reduceQuantityHandler(item.parent_name)
                          }
                          // onClick={() => this.reduceQuantityHandler(item.id)}
                        >
                          <Icon name='minus' />
                        </Button>
                        <Button disabled>{item.quantity}</Button>
                        <Button
                          icon
                          onClick={() =>
                            this.addQuantityHandler(item.parent_name)
                          }
                          // onClick={() => this.addQuantityHandler(item.id)}
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
      <>
        <List celled divided verticalAlign='middle'>
          {!this.props.isMyItems && (
            <List.Item key='common-items'>
              <Header>COMMON ITEMS</Header>
            </List.Item>
          )}
          {this.renderList(
            // render common items
            this.props.items.filter((item) => {
              return item.common_item === '1';
            })
          )}
          {this.renderCategories()}
          {!this.props.isMyItems && (
            <List.Item key={Math.random() * 1000}>
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
                    Don't worry about getting the number of boxes just right.
                    Your final shipment weight will be calculated on the day of
                    your move.
                  </p>
                </Grid.Row>
              </Grid>
            </List.Item>
          )}
        </List>
        <Grid>
          <Grid.Row stretched centered>
            <Button
              style={{ margin: '12px' }}
              as={Link}
              to={`/${this.props.userToken}/items/special`}
              className='ui colorBrightGreen button'
              fluid
            >
              Confirm Inventory
            </Button>
          </Grid.Row>
        </Grid>
      </>
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
