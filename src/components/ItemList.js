import React from 'react';
import { connect } from 'react-redux';
import ListContainer from './ListContainer';

class ItemList extends React.Component {
  renderMyItems() {
    return this.props.filteredItems.filter((item) => {
      return item.quantity > 0;
    });
  }

  render() {
    return (
      <ListContainer
        isMyItems={this.props.isMyItems}
        items={
          this.props.isMyItems ? this.renderMyItems() : this.props.filteredItems
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredItems: state.filteredItems,
  };
};

export default connect(mapStateToProps, {})(ItemList);
