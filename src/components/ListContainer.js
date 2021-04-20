import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  List,
  Accordion,
  Image,
  Header,
} from 'semantic-ui-react';
import {
  addItemQuantity,
  reduceItemQuantity,
  storeInventory,
  triggerAllItemsModal,
  triggerBoxCalculator,
} from '../actions';
import BoxCalculatorModal from './BoxCalculatorModal';
import FirstItemOptionsModal from './FirstItemOptionsModal';
import ItemQuantityMenu from './ItemQuantityMenu';

const styles = {
  listItem: {
    backgroundColor: '#E7E8EC',
  },
  addBtn: {
    borderRadius: '500px',
    backgroundColor: 'inherit',
    border: '1px solid',
  },
  listItemIcon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
};

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      modalItem: null,
      selectedValue: null,
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  onDialogClose = (subItemId) => {
    if (subItemId) {
      this.props.addItemQuantity(subItemId);
    }
    this.setState({ modalItem: null, selectedValue: null });
  };

  onPlusSignClick = (item) => {
    this.props.addItemQuantity(item.item_ids);
    this.setState({ modalItem: item, selectedValue: null });
  };

  addQuantityHandler(item) {
    this.props.addItemQuantity(item.item_ids);
    if (item.innerItems && item.innerItems.length > 0) {
      this.setState({ modalItem: item });
    } else {
      this.setState({ modalItem: null, selectedValue: null });
    }
  }

  renderCategories() {
    const uniqueCategories = [
      ...new Set(this.props.items.map((item) => item.type_name)),
    ]; // get unique categories

    return uniqueCategories.map((category) => {
      return (
        <React.Fragment key={category}>
          {!this.props.itemsSearchInput && !this.props.isMyItems && (
            <List.Item key={category} style={styles.listItem}>
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
        </React.Fragment>
      );
    });
  }

  renderList(items, isBoxesCategory = false) {
    const { activeIndex } = this.state;
    return items.map((item, index) => {
      return (
        <List.Item key={item.parent_name}>
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
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <div
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      <Image
                        style={styles.listItemIcon}
                        src={`${process.env.PUBLIC_URL}/assets/${item.icon}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${process.env.PUBLIC_URL}/assets/default.svg`;
                        }}
                      />
                      {item.parent_name}
                    </div>
                  </Grid.Column>

                  <Grid.Column textAlign='right'>
                    {item.quantity === 0 ? (
                      isBoxesCategory &&
                      !this.props.triggers.isBoxCalcTriggered ? (
                        <Button
                          style={styles.addBtn}
                          as={Link}
                          to={`/p=${this.props.userToken}/box-calculator`}
                          onClick={() => {
                            this.props.triggerBoxCalculator();
                          }}
                        >
                          ADD
                        </Button>
                      ) : (
                        <Button
                          style={styles.addBtn}
                          onClick={() => this.addQuantityHandler(item)}
                        >
                          ADD
                        </Button>
                      )
                    ) : (
                      <>
                        <ItemQuantityMenu
                          itemQuantity={item.quantity}
                          itemId={item.item_ids}
                          item={item}
                          addQuantityCallback={this.onPlusSignClick}
                        />
                      </>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>

            {item.innerItems && (
              <Accordion.Content active={activeIndex === index}>
                <ul
                  style={{
                    listStyleType: 'none',
                    float: 'left',
                    textAlign: 'left',
                    margin: '0px',
                  }}
                >
                  {item.innerItems.map((innerItem, index) => {
                    if (innerItem.quantity > 0) {
                      return (
                        <li key={innerItem.item_id}>
                          <p
                            style={{ color: '#57C3F3' }}
                            onClick={() => {
                              this.setState({ selectedValue: innerItem.item });
                              this.addQuantityHandler(item);
                            }}
                          >
                            {innerItem.quantity}{' '}
                            <span style={{ textDecoration: 'underline' }}>
                              {innerItem.item}
                            </span>
                          </p>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
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
          {!this.props.itemsSearchInput && !this.props.isMyItems && (
            <List.Item key='common-items' style={styles.listItem}>
              <Header>COMMON ITEMS</Header>
            </List.Item>
          )}
          {!this.props.isMyItems &&
            !this.props.itemsSearchInput &&
            this.renderList(
              this.props.items.filter((item) => {
                return item.common_item === 1;
              })
            )}
          {!this.props.itemsSearchInput
            ? this.renderCategories()
            : this.renderList(this.props.items)}
        </List>
        <Grid>
          <Grid.Row stretched centered style={{ padding: '12px' }}>
            <Button
              style={{ margin: '12px' }}
              as={Link}
              to={`/p=${this.props.userToken}/items/special`}
              onClick={() =>
                this.props.storeInventory(
                  this.props.items,
                  this.props.currentUser.lead_id
                )
              }
              className='ui colorBrightGreen button'
              fluid
            >
              Confirm Inventory
            </Button>
          </Grid.Row>
        </Grid>
        <FirstItemOptionsModal
          item={this.state.modalItem}
          selectedValue={this.state.selectedValue}
          closeCallback={this.onDialogClose}
        />
        {/* <BoxCalculatorModal isOpen={this.props.triggers.isBoxCalcTriggered} /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
    currentUser: state.auth.currentUser,
    triggers: state.triggers,
    itemsSearchInput: state.itemsSearchInput,
  };
};

export default connect(mapStateToProps, {
  addItemQuantity,
  reduceItemQuantity,
  triggerBoxCalculator,
  triggerAllItemsModal,
  storeInventory,
})(ListContainer);
