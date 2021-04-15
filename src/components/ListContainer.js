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
import ItemOptionsModal from './ItemOptionsModal';
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

  renderCategories() {
    const uniqueCategories = [
      ...new Set(this.props.items.map((item) => item.type_name)),
    ]; // get unique categories

    return uniqueCategories.map((category) => {
      return (
        <React.Fragment key={category}>
          {category !== 'Boxes' &&
            !this.props.itemsSearchInput &&
            !this.props.isMyItems &&
            !this.props.isSpecialItems && (
              <List.Item key={category} style={styles.listItem}>
                <Header>{category}</Header>
              </List.Item>
            )}

          {category === 'Boxes' &&
            !this.props.isMyItems &&
            !this.props.isSpecialItems && (
              <List.Item key='boxes-item' style={styles.listItem}>
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
                      Your final shipment weight will be calculated on the day
                      of your move.
                    </p>
                  </Grid.Row>
                </Grid>
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
      let optionsFromInnerItems = [];
      let actions = [];
      if (item.innerItems) {
        optionsFromInnerItems = item.innerItems.map((innerItem, index) => {
          return {
            key: index,
            text: innerItem.item,
            value: innerItem.item_id,
            quantity: innerItem.quantity,
          };
        });
        actions = optionsFromInnerItems.map((option) => {
          return {
            key: option.key,
            content: option.text,
            id: option.value,
            quantity: option.quantity,
          };
        });
      }
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
                <Grid.Row columns={this.props.isSpecialItems ? 4 : 2}>
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

                  {this.props.isSpecialItems && (
                    <>
                      <Grid.Column></Grid.Column>
                      <Grid.Column textAlign='right'></Grid.Column>
                    </>
                  )}

                  <Grid.Column textAlign='right'>
                    {item.quantity === 0 ? (
                      isBoxesCategory &&
                      !this.props.triggers.isBoxCalcTriggered ? (
                        <Button
                          style={styles.addBtn}
                          as={Link}
                          to={`/${this.props.userToken}/box-calculator`}
                          onClick={this.props.triggerBoxCalculator}
                        >
                          ADD
                        </Button>
                      ) : (
                        <Button
                          style={styles.addBtn}
                          onClick={() => this.addQuantityHandler(item.item_ids)}
                        >
                          ADD
                        </Button>
                      )
                    ) : (
                      <>
                        {item.innerItems && (
                          <FirstItemOptionsModal
                            item={item}
                            optionsFromInnerItems={optionsFromInnerItems}
                            header={item.parent_name}
                            innerItems={actions}
                          />
                        )}
                        <ItemQuantityMenu
                          itemQuantity={item.quantity}
                          itemId={item.item_ids}
                        />
                      </>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>

            {item.innerItems && (
              <Accordion.Content active={activeIndex === index}>
                <ItemOptionsModal
                  optionsFromInnerItems={optionsFromInnerItems}
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
          {!this.props.itemsSearchInput &&
            !this.props.isMyItems &&
            !this.props.isSpecialItems && (
              <List.Item key='common-items' style={styles.listItem}>
                <Header>COMMON ITEMS</Header>
              </List.Item>
            )}
          {!this.props.isMyItems &&
            this.renderList(
              this.props.items.filter((item) => {
                return item.common_item === 1;
              })
            )}
          {this.renderCategories()}
        </List>
        {!this.props.isSpecialItems && (
          <Grid>
            <Grid.Row stretched centered style={{ padding: '12px' }}>
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
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
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
