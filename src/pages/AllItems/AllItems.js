import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Header,
  Label,
  Menu,
  Segment,
  Tab,
} from 'semantic-ui-react';
import {
  filterItems,
  itemsSearchInputChange,
  storeInventory,
} from '../../actions';
import ListContainer from '../../components/ListContainer/ListContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import SmallStuffModal from '../../components/SmallStuffModal/SmallStuffModal';
import history from '../../history';
import './AllItems.css';

class AllItems extends Component {
  isAnyItemSelected = () => {
    return this.props.items.reduce((sum, val) => sum + val.quantity, 0) < 1;
  };

  renderItemsTotalQuantity() {
    const result = this.props.items.reduce((sum, val) => sum + val.quantity, 0);
    return (
      (
        <Label id='items-total-quantity-lbl'>
          <span id='items-total-quantity-txt'>{result}</span>
        </Label>
      ) || ''
    );
  }

  clearSearchHandler = () => {
    document.querySelector('#search-input').value = '';
    this.props.itemsSearchInputChange('');
    this.props.filterItems(this.props.items, '');
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

  confirmInventoryOnClickHandler = () => {
    this.props.storeInventory(this.props.items, this.props.leadId);
    if (this.isSpecialItems()) {
      history.push(`/p=${this.props.userToken}/items/special`);
    } else {
      // history.push(`/p=${this.props.userToken}/confirmation`);
      // window.location.href = `https://bvl-sabf.web.app/welcome/${this.props.userToken}`;
      window.location.href = `https://myquote.budgetvanlines.com/welcome/${this.props.userToken}`;
    }
  };

  render() {
    return (
      <>
        <SmallStuffModal />
        <Grid
          verticalAlign='middle'
          centered
          padded='vertically'
          style={{ backgroundColor: '#F0F1F3', margin: '0px' }}
        >
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header
                floated='left'
                size='tiny'
                textAlign='center'
                style={{ fontSize: '14px' }}
              >
                Moving Inventory List
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={this.isAnyItemSelected()}
                id='confirm-inventory-lnk'
                size='tiny'
                floated='right'
                onClick={this.confirmInventoryOnClickHandler}
              >
                CONFIRM INVENTORY
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '0px' }}>
            <Tab
              onTabChange={this.clearSearchHandler}
              style={{
                width: 'inherit',
                backgroundColor: '#F0F1F3',
              }}
              panes={[
                {
                  menuItem: 'ALL ITEMS',
                  render: () => (
                    <Tab.Pane
                      style={{
                        padding: '0px',
                        backgroundColor: '#F0F1F3',
                      }}
                    >
                      <SearchBar />
                      <Segment id='all-items-list-segment'>
                        <ListContainer
                          isMyItems={false}
                          items={this.props.filteredItems}
                          forceRerenderCallback={() => this.forceUpdate()}
                        />
                      </Segment>
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: (
                    <Menu.Item key='my-items'>
                      <Grid verticalAlign='middle'>
                        <Grid.Row>
                          <Grid.Column width={10} style={{ padding: '0px' }}>
                            MY ITEMS
                          </Grid.Column>
                          <Grid.Column width={6}>
                            {this.renderItemsTotalQuantity()}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Menu.Item>
                  ),
                  render: () => (
                    <Tab.Pane
                      style={{
                        padding: '0px',
                        backgroundColor: '#F0F1F3',
                      }}
                    >
                      <SearchBar isMyItems />
                      <Segment id='my-items-list-segment'>
                        <ListContainer
                          isMyItems
                          items={this.props.filteredItems.filter((item) => {
                            return item.quantity > 0;
                          })}
                          forceRerenderCallback={() => this.forceUpdate()}
                        />
                      </Segment>
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
    leadId: state.auth.currentUser.lead_id,
    items: state.items,
    filteredItems: state.filteredItems,
  };
};

export default connect(mapStateToProps, {
  storeInventory,
  filterItems,
  itemsSearchInputChange,
})(AllItems);
