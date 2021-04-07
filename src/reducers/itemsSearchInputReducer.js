import * as types from '../actions/types';

const itemsSearchInputReducer = (state = '', action) => {
  switch (action.type) {
    case types.ITEMS_SEARCH_INPUT_CHANGE:
      return action.payload;

    default:
      return state;
  }
};

export default itemsSearchInputReducer;
