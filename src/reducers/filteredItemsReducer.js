import * as types from '../actions/types';

const filteredItemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_ITEMS:
      let lookup = [];
      if (!action.input) {
        return action.payload;
      }
      let searchTerm = action.input.toLowerCase();
      return action.payload
        .filter((item) => {
          let normalizedValue = item.parent_name.toLowerCase();
          if (normalizedValue.includes(searchTerm)) {
            if (!lookup.includes(normalizedValue)) {
              lookup.push(normalizedValue);
              return true;
            }
          }
          return false;
        })
        .sort((a, b) => {
          let indexDifference =
            a.parent_name.toLowerCase().indexOf(searchTerm) -
            b.parent_name.toLowerCase().indexOf(searchTerm);
          if (indexDifference !== 0) {
            return indexDifference;
          }
          return a.parent_name.length - b.parent_name.length;
        });
    default:
      return state;
  }
};

export default filteredItemsReducer;
