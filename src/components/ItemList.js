import React from 'react';
import { connect } from 'react-redux';
import ListContainer from './ListContainer';

class ItemList extends React.Component {
  renderMyItems() {
    return this.props.filteredItems.filter((item) => {
      return item.quantity > 0;
    });
  }

  renderSpecialItems() {
    return this.props.items.filter((item) => {
      return item.quantity > 0 && item.sh_price !== '0';
    });
  }

  render() {
    return (
      <ListContainer
        isSpecialItems={this.props.isSpecialItems}
        isMyItems={this.props.isMyItems}
        items={
          this.props.isMyItems
            ? this.renderMyItems()
            : this.props.isSpecialItems
            ? this.renderSpecialItems()
            : this.props.filteredItems
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    filteredItems: state.filteredItems,
  };
};

export default connect(mapStateToProps, {})(ItemList);
