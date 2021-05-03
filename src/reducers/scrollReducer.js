import * as types from '../actions/types';

const scrollReducer = (state = null, action) => {
  switch (action.type) {
    case types.SCROLL_UP_EVENT:
      return null;

    case types.SCROLL_DOWN_EVENT:
      return action.payload;

    default:
      return state;
  }
};

export default scrollReducer;
