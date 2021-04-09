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
  Dropdown,
  Menu,
} from 'semantic-ui-react';
import {
  addItemQuantity,
  reduceItemQuantity,
  storeInventory,
  triggerAllItemsModal,
  triggerBoxCalculator,
} from '../actions';
import ItemOptionsModal from './ItemOptionsModal';

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
            <List.Item key={category} style={{ backgroundColor: '#E7E8EC' }}>
              <Header>{category}</Header>
            </List.Item>
          )}
          {this.renderList(
            // render each category header followed by its items
            this.props.items.filter((item) => {
              return item.type_name === category;
            }),
            category === 'Boxes'
          )}
        </>
      );
    });
  }

  renderList(items, isBoxesCategory = false) {
    const { activeIndex } = this.state;
    return items.map((item, index) => {
      let optionsFromInnerItems = [];
      let actions = [];
      if (item.innerItems) {
        optionsFromInnerItems = item.innerItems.map((item, index) => {
          return {
            key: index,
            text: item.item,
            value: item.item_id,
          };
        });
        actions = optionsFromInnerItems.map((option) => {
          return {
            key: option.key,
            content: option.text,
          };
        });
      }
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
                      isBoxesCategory &&
                      !this.props.triggers.isBoxCalcTriggered ? (
                        <Button
                          style={{
                            borderRadius: '500px',
                            backgroundColor: 'inherit',
                            border: '1px solid',
                          }}
                          as={Link}
                          to={`/${this.props.userToken}/box-calculator`}
                          onClick={this.props.triggerBoxCalculator}
                        >
                          {/* <Button onClick={() => this.addQuantityHandler(item.id)}> */}
                          ADD
                        </Button>
                      ) : (
                        <Button
                          style={{
                            borderRadius: '500px',
                            backgroundColor: 'inherit',
                            border: '1px solid',
                          }}
                          onClick={() =>
                            this.addQuantityHandler(item.parent_name)
                          }
                        >
                          {/* <Button onClick={() => this.addQuantityHandler(item.id)}> */}
                          ADD
                        </Button>
                      )
                    ) : (
                      <Menu
                        size='mini'
                        style={{
                          display: 'inline-flex',
                          borderRadius: '500px',
                          backgroundColor: '#3A4B60',
                        }}
                      >
                        <Menu.Item
                          style={{
                            color: 'white',
                            paddingRight: '8px',
                            paddingLeft: '8px',
                          }}
                          onClick={() =>
                            this.reduceQuantityHandler(item.parent_name)
                          }
                        >
                          <Icon name='minus' />
                        </Menu.Item>
                        <Menu.Item
                          style={{
                            color: 'white',
                            paddingRight: '8px',
                            paddingLeft: '8px',
                          }}
                        >
                          {item.quantity}
                        </Menu.Item>
                        <Menu.Item
                          style={{
                            color: 'white',
                            paddingRight: '8px',
                            paddingLeft: '8px',
                          }}
                          onClick={() =>
                            this.addQuantityHandler(item.parent_name)
                          }
                        >
                          <Icon name='plus' />
                        </Menu.Item>
                      </Menu>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>

            {item.innerItems && (
              <Accordion.Content active={activeIndex === index}>
                <ItemOptionsModal
                  trigger={
                    <Dropdown
                      style={{ color: '#57C3F3' }}
                      options={optionsFromInnerItems}
                      defaultValue={optionsFromInnerItems[0].value}
                    />
                  }
                  header={item.parent_name}
                  actions={actions}
                />
              </Accordion.Content>
            )}
          </Accordion>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <>
        <List celled divided verticalAlign='middle'>
          {/* render common items */}
          {!this.props.isMyItems && (
            <List.Item key='common-items'>
              <Header>COMMON ITEMS</Header>
            </List.Item>
          )}
          {!this.props.isMyItems &&
            this.renderList(
              this.props.items.filter((item) => {
                return item.common_item === '1';
              })
            )}
          {this.renderCategories()}
          {!this.props.isMyItems && (
            <List.Item key='boxes-item'>
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
              onClick={() =>
                this.props.storeInventory(
                  this.props.items,
                  this.props.userToken
                )
              }
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
    triggers: state.triggers,
  };
};

export default connect(mapStateToProps, {
  addItemQuantity,
  reduceItemQuantity,
  triggerBoxCalculator,
  triggerAllItemsModal,
  storeInventory,
})(ListContainer);
