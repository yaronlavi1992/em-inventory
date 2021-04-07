import * as types from '../actions/types';

const filteredItemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_ITEMS:
      // return INITIAL_STATE.filter(
      return action.payload.filter(
        (item) =>
          item.parent_name.toLowerCase().indexOf(action.input.toLowerCase()) !==
          -1
        // (item) => item.name.indexOf(action.input) !== -1
      );
    default:
      return state;
  }
};

export default filteredItemsReducer;
