import * as types from '../actions/types';

const filteredItemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_ITEMS:
      return action.payload
        .filter(
          (item) =>
            item.parent_name
              .toLowerCase()
              .indexOf(action.input.toLowerCase()) !== -1
        )
        .sort((a, b) => {
          return (
            a.parent_name.toLowerCase().indexOf(action.input.toLowerCase()) -
            b.parent_name.toLowerCase().indexOf(action.input.toLowerCase())
          );
        });
    default:
      return state;
  }
};

export default filteredItemsReducer;
