import React from 'react';
import { connect } from 'react-redux';
import GridContainer from './GridContainer';
import ListContainer from './ListContainer';

class ItemList extends React.Component {
  renderMyItems() {
    return this.props.items.filter((item) => {
      return item.quantity > 0;
    });
  }

  render() {
    return (
      <ListContainer
        isSpecialItems={this.props.isSpecialItems}
        items={this.props.isMyItems ? this.renderMyItems() : this.props.items}
      />
      // <GridContainer
      //   isSpecialItems={this.props.isSpecialItems}
      //   items={this.props.isMyItems ? this.renderMyItems() : this.props.items}
      // />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, {})(ItemList);
