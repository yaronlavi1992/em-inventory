import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import { filterItems, itemsSearchInputChange } from '../../actions';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      willResetScroll: true,
    };
  }

  componentDidMount() {
    this.props.filterItems(this.props.items, '');
  }

  onInputChangeHandler = (event) => {
    if (this.state.willResetScroll && event.target.value.length === 1) {
      document.querySelector('#all-item-list-segment').scrollTo(0, 0);
      this.setState({
        willResetScroll: false,
      });
    }
    this.props.itemsSearchInputChange(event.target.value);
    this.props.filterItems(this.props.items, event.target.value);
    if (document.querySelector('#search-input').value === '') {
      this.setState({
        willResetScroll: true,
      });
    }
  };

  onCancelClickHandler = () => {
    document.querySelector('#search-input').value = '';
    this.props.itemsSearchInputChange('');
    this.props.filterItems(this.props.items, '');
    this.setState({
      willResetScroll: true,
    });
  };

  render() {
    return (
      <div id='search-bar-wrapper'>
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
            <button id='cancel-btn' onClick={this.onCancelClickHandler}>
              CANCEL
            </button>
          </>
        )}
      </div>
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
})(SearchBar);
