import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  List,
  Accordion,
  Image,
  Header,
  Label,
  Icon,
} from 'semantic-ui-react';
import './ListContainer.css';
import {
  addItemQuantity,
  reduceItemQuantity,
  storeInventory,
  triggerAllItemsModal,
  triggerBoxCalculator,
  scrollDownEvent,
  scrollUpEvent,
} from '../../actions';
import BoxCalculatorLoaderModal from '../BoxCalculatorLoaderModal/BoxCalculatorLoaderModal';
import FirstItemOptionsModal from '../FirstItemOptionsModal/FirstItemOptionsModal';
import ItemQuantityMenu from '../ItemQuantityMenu/ItemQuantityMenu';
import BoxCalculatorModal from '../BoxCalculatorModal/BoxCalculatorModal';
import ClearAllItemsModal from '../DialogModal/ClearAllItemsModal';
import history from '../../history';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      modalItem: null,
      selectedValue: null,
      isDialogModalTriggered: false,
    };
  }

  isAnyItemSelected = () => {
    return this.props.items.reduce((sum, val) => sum + val.quantity, 0) < 1;
  };

  scrollHandler = (event) => {
    if (event.deltaY > 0) {
      return this.props.scrollDownEvent();
    }
    this.props.scrollUpEvent();
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    this.setState({ activeIndex: index });
  };

  onDialogClose = (subItemId) => {
    if (subItemId) {
      this.props.addItemQuantity(subItemId, this.props.userToken);
    }
    this.setState({ modalItem: null, selectedValue: null });
  };

  addQuantityHandler(item) {
    this.props.addItemQuantity(item.item_ids, this.props.userToken);
    if (item.innerItems && item.innerItems.length > 0) {
      this.setState({ modalItem: item });
    } else {
      this.setState({ modalItem: null, selectedValue: null });
    }
  }

  reduceQuantityHandler(itemId) {
    this.props.reduceItemQuantity(itemId);
    this.props.forceRerenderCallback();
  }

  clearInventoryHandler = (isConfirmed) => {
    this.setState({ isDialogModalTriggered: false });
    if (isConfirmed) {
      this.props.items.forEach((item) => {
        if (item.quantity > 0) {
          if (item.innerItems) {
            item.innerItems.forEach((innerItem) => (innerItem.quantity = 0));
          }
          item.quantity = 0;
        }
      });
      this.props.forceRerenderCallback();
    }
  };

  isSpecialItems = () => {
    const selectedItems = this.props.items.filter((item) => item.quantity > 0);
    let res = false;
    selectedItems.forEach((item) => {
      if (!item.innerItems && Number(item.sh_price) > 0) {
        res = true;
      }
    });
    selectedItems.forEach((item) => {
      if (item.innerItems) {
        item.innerItems.forEach((innerItem) => {
          if (innerItem.quantity > 0 && Number(innerItem.sh_price) > 0) {
            res = true;
          }
        });
      }
    });
    return res;
  };

  renderAprxVal() {
    return `
    ${this.props.items
      .map((item) => {
        if (!item.innerItems && Number(item.quantity) > 0) {
          return Number(item.quantity) * Number(item.volume);
        } else if (item.innerItems) {
          return item.innerItems.reduce(
            (a, b) =>
              Number(b.quantity) > 0 && Number(b.volume) > 0
                ? a + Number(b.quantity) * Number(b.volume)
                : a + 0,
            0
          );
        }
        return null;
      })
      .reduce((a, b) => (b >= 0 ? a + b : a), 0)}
  cf`;
  }

  renderCategories() {
    const uniqueCategories = [
      ...new Set(this.props.items.map((item) => item.type_name)),
    ]; // get unique categories
    return uniqueCategories.map((category) => {
      return (
        <React.Fragment key={category}>
          {category !== null &&
            !this.props.itemsSearchInput &&
            !this.props.isMyItems && (
              <List.Item key={category} id='category-header'>
                <Header id='category-header-text'>{category}</Header>
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
        <List.Item
          key={item.parent_name}
          onWheel={(e) => this.scrollHandler(e)}
        >
          <Accordion>
            <Accordion.Title
              active={activeIndex === index}
              index={index}
              onClick={this.handleClick}
            >
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Image
                    id='list-item-icon'
                    src={`${process.env.PUBLIC_URL}/assets/${item.icon}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${process.env.PUBLIC_URL}/assets/default.svg`;
                    }}
                  />
                  <span className='listItemName'>{item.parent_name}</span>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                  }}
                >
                  {item.quantity === 0 ? (
                    isBoxesCategory &&
                    this.props.triggers.isBoxCalcTriggered === 0 ? (
                      <Button
                        id='add-btn'
                        onClick={() => this.props.triggerBoxCalculator(1)}
                      >
                        ADD
                      </Button>
                    ) : (
                      <Button
                        id='add-btn'
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
                        addQuantityCallback={() =>
                          this.addQuantityHandler(item)
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            </Accordion.Title>
            {item.innerItems && (
              <Accordion.Content active={activeIndex === index}>
                <ul id='inner-items-list'>
                  {item.innerItems.map((innerItem) => {
                    if (innerItem.quantity > 0) {
                      return (
                        <li
                          key={innerItem.item_id}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <p
                            style={{ color: '#57C3F3', marginBottom: '10px' }}
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
                          <span
                            style={{
                              paddingLeft: '0.5rem',
                              marginBottom: '10px',
                            }}
                            onClick={() =>
                              this.reduceQuantityHandler(innerItem.item_id)
                            }
                          >
                            <Image
                              src={`${process.env.PUBLIC_URL}/assets/filled.svg`}
                              style={{ width: '12px', height: '12px' }}
                            />
                          </span>
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
            <List.Item key='common-items' id='category-header'>
              <Header id='category-header-text'>COMMON ITEMS</Header>
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
        <Grid style={{ margin: '0px' }}>
          <Grid.Row>
            <Grid.Column
              width={8}
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              Aprx Vol:
              <Label id='aprx-val-lbl'>
                <span id='aprx-val-txt'>{this.renderAprxVal()}</span>
              </Label>
            </Grid.Column>
            <Grid.Column
              width={8}
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                borderLeft: '1px solid #3A4B60',
              }}
            >
              Total Items:
              <Label id='items-total-lbl'>
                <span id='items-total-txt'>
                  {this.props.items.reduce((sum, val) => sum + val.quantity, 0)}
                </span>
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched centered style={{ padding: '0px' }}>
            <Button
              style={{ margin: '12px' }}
              disabled={this.isAnyItemSelected()}
              onClick={() => {
                this.props.storeInventory(this.props.items, this.props.userToken);
                if (this.isSpecialItems()) {
                  history.push(`/p/${this.props.userToken}/items/special`);
                } else {
                  // history.push(`/p/${this.props.userToken}/confirmation`);
                  window.location.href = `https://bvl-sabf.web.app/welcome/${this.props.userToken}`;
                }
              }}
              id='confirm-inventory-btn'
              fluid
            >
              Confirm Inventory
            </Button>
          </Grid.Row>
          <Grid.Row stretched centered style={{ padding: '0px' }}>
            <Button
              id='clear-inventory-btn'
              disabled={this.isAnyItemSelected()}
              icon
              labelPosition='left'
              onClick={() => this.setState({ isDialogModalTriggered: true })}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Icon
                  as={Image}
                  src={`${process.env.PUBLIC_URL}/assets/filled.svg`}
                  style={{ width: '12px', height: '12px' }}
                />
                CLEAR ALL INVENTORY ITEMS
              </div>
            </Button>
          </Grid.Row>
        </Grid>
        <FirstItemOptionsModal
          item={this.state.modalItem}
          selectedValue={this.state.selectedValue}
          closeCallback={this.onDialogClose}
        />
        <BoxCalculatorModal
          isTriggered={this.props.triggers.isBoxCalcTriggered}
          closeCallback={(triggerState) =>
            this.props.triggerBoxCalculator(triggerState)
          }
        />
        <BoxCalculatorLoaderModal
          isTriggered={this.props.triggers.isBoxCalcTriggered}
          closeCallback={() => this.props.triggerBoxCalculator(3)}
        />
        <ClearAllItemsModal
          isTriggered={this.state.isDialogModalTriggered}
          closeCallback={(isConfirmed) =>
            this.clearInventoryHandler(isConfirmed)
          }
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
    leadId: state.auth.currentUser && state.auth.currentUser.lead_id,
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
  scrollDownEvent,
  scrollUpEvent,
})(ListContainer);
