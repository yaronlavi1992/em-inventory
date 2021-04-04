import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { fetchItems, filterItems, itemsSearchInputChange } from '../actions';

class SearchBar extends Component {
  componentDidMount() {
    this.props.filterItems(this.props.items, '');
  }

  onInputChangeHandler = (event) => {
    this.props.itemsSearchInputChange(event.target.value);
    this.props.filterItems(this.props.items, event.target.value);
  };

  render() {
    return (
      <Input
        className='searchBox'
        type='search'
        name='search'
        icon='search'
        iconPosition='left'
        placeholder={`Search ${this.props.isMyItems ? 'my' : 'all'} items`}
        onChange={this.onInputChangeHandler}
        style={{
          minWidth: '-webkit-fill-available',
          padding: '0.5rem',
          outline: 'none',
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    itemsSearchInput: state.itemsSearchInput,
  };
};

export default connect(mapStateToProps, {
  itemsSearchInputChange,
  filterItems,
  fetchItems,
})(SearchBar);
