import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { addItemQuantity, reduceItemQuantity } from '../actions';

const styles = {
  menu: {
    display: 'inline-flex',
    borderRadius: '500px',
    backgroundColor: '#3A4B60',
  },
  menuItem: {
    color: 'white',
    paddingRight: '8px',
    paddingLeft: '8px',
  },
};

class ItemQuantityMenu extends Component {
  addQuantityHandler(itemId) {
    this.props.addItemQuantity(itemId);
  }

  reduceQuantityHandler(itemId) {
    this.props.reduceItemQuantity(itemId);
  }

  render() {
    return (
      <Menu size='mini' style={styles.menu}>
        <Menu.Item
          style={styles.menuItem}
          onClick={() => this.reduceQuantityHandler(this.props.itemId)}
        >
          <Icon name='minus' />
        </Menu.Item>
        <Menu.Item style={styles.menuItem}>{this.props.itemQuantity}</Menu.Item>
        <Menu.Item
          style={styles.menuItem}
          onClick={this.props.addQuantityCallback}
        >
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
