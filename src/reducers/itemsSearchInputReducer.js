import { ITEMS_SEARCH_INPUT_CHANGE } from '../actions/types';

const itemsSearchInputReducer = (state = '', action) => {
  switch (action.type) {
    case ITEMS_SEARCH_INPUT_CHANGE:
      return action.payload;

    default:
      return state;
  }
};

export default itemsSearchInputReducer;
