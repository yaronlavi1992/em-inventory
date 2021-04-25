import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { addItemQuantity, reduceItemQuantity } from '../../actions';
import './ItemQuantityMenu.css';

class ItemQuantityMenu extends Component {
  addQuantityHandler(itemId) {
    this.props.addItemQuantity(itemId);
  }

  reduceQuantityHandler(itemId) {
    this.props.reduceItemQuantity(itemId);
  }

  render() {
    return (
      <Menu size='mini' id='menu'>
        <Menu.Item
          id='menu-item'
          onClick={() => this.reduceQuantityHandler(this.props.itemId)}
        >
          <Icon name='minus' />
        </Menu.Item>
        <Menu.Item id='menu-item'>{this.props.itemQuantity}</Menu.Item>
        <Menu.Item id='menu-item' onClick={this.props.addQuantityCallback}>
          <Icon name='plus' />
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(null, {
  addItemQuantity,
  reduceItemQuantity,
})(ItemQuantityMenu);
