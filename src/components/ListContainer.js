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
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      modalItem: null,
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  addQuantityHandler(item) {
    this.props.addItemQuantity(item.item_ids);
    if (item.innerItems && item.innerItems.length > 0) {
      this.setState({ modalItem: item });
    } else {
      this.setState({ modalItem: null });
    }
  }

  renderCategories() {
    const uniqueCategories = [
      ...new Set(this.props.items.map((item) => item.type_name)),
    ]; // get unique categories

    return uniqueCategories.map((category) => {
      return (
        <React.Fragment key={category}>
          {!this.props.itemsSearchInput &&
            !this.props.isMyItems &&
            !this.props.isSpecialItems && (
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

        //R: probably there is no need for this array? It's almost identical to optionsFromInnerItems.
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
                          to={`/p=${this.props.userToken}/box-calculator`}
                          onClick={this.props.triggerBoxCalculator}
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
                        />
                      </>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>

            {item.innerItems && (
              <Accordion.Content active={activeIndex === index}>
                {
                  //R: list of selected subitems should be a part of this component
                  //R: here is a draft
                }
                <ul>
                  {item.innerItems.map((innerItem, index) => {
                    if (innerItem.quantity > 0)
                      return (
                        <li key={innerItem.item_id}>
                          {innerItem.quantity} {innerItem.item}
                        </li>
                      );
                  })}
                </ul>

                {
                  //R: we should probably use the same dialog here, FirstItemOptionsModal?
                  //R: if not, then anyway it's better to refactor this using FirstItemOptionsModal as example
                }
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
        {
          //R: category separation should be disabled for filtered items (now it affects sort order)
          //R: Or alternatively categories should be shown for filtered items.
        }
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
          {/* if no itemSearchInput render categories
          else render list */}
          {this.renderCategories()}
        </List>
        {!this.props.isSpecialItems && (
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
        )}
        {
          //R: it's better to have one reusable instance of the Modal window
          //R: and not create it for each item. It's how the component supposed to work.
        }
        <FirstItemOptionsModal
          item={this.state.modalItem}

          //R: other properties can be internally deduced from "item", so we can remove them
          /*
          optionsFromInnerItems={optionsFromInnerItems}
          header={item.parent_name}
          innerItems={actions}*/
        />
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
