import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import { fetchItems, filterItems, itemsSearchInputChange } from '../../actions';
import './SearchBar.css';

class SearchBar extends Component {
  componentDidMount() {
    this.props.filterItems(this.props.items, '');
  }

  onInputChangeHandler = (event) => {
    this.props.itemsSearchInputChange(event.target.value);
    this.props.filterItems(this.props.items, event.target.value);
  };

  onCancelClickHandler = () => {
    document.querySelector('#search-input').value = '';
    this.props.itemsSearchInputChange('');
    this.props.filterItems(this.props.items, '');
  };

  render() {
    return (
      <div
        // className='ui right icon'
        style={{
          display: 'inline-flex',
          width: 'inherit',
          justifyContent: 'center',
        }}
      >
        <Input
          id='search-input'
          className='searchBox'
          type='search'
          icon='search'
          iconPosition='left'
          placeholder={`Search ${this.props.isMyItems ? 'my' : 'all'} items`}
          onChange={this.onInputChangeHandler}
        />
        {this.props.itemsSearchInput !== '' && (
          <>
            <Icon
              id='close-search-btn'
              name='close'
              onClick={this.onCancelClickHandler}
            />
            <p id='cancel-btn' onClick={this.onCancelClickHandler}>
              CANCEL
            </p>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    filteredItems: state.filteredItems,
    itemsSearchInput: state.itemsSearchInput,
  };
};

export default connect(mapStateToProps, {
  itemsSearchInputChange,
  filterItems,
  fetchItems,
})(SearchBar);
