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
          if (lookup.includes(normalizedValue)) {
            return false;
          }
          let list = [];
          if (item.alias_list) {
            list = item.alias_list.toLowerCase().split(' ');
          }
          if (normalizedValue.includes(searchTerm)) {
            lookup.push(normalizedValue);
            return true;
          }
          if (list.find((alias) => alias.includes(searchTerm))) {
            lookup.push(normalizedValue);
            return true;
          }
          return false;
        })
        .sort((a, b) => {
          let indexDifference =
            a.parent_name.toLowerCase().indexOf(searchTerm) -
            b.parent_name.toLowerCase().indexOf(searchTerm);
          let aAliasNotUsed =
            !a.alias_list || !a.alias_list.toLowerCase().includes(searchTerm);
          let bAliasNotUsed =
            !b.alias_list || !b.alias_list.toLowerCase().includes(searchTerm);
          if (
            (aAliasNotUsed && bAliasNotUsed) ||
            a.alias_list === b.alias_list
          ) {
            if (indexDifference !== 0) {
              return indexDifference;
            }
            return a.parent_name.length - b.parent_name.length;
          }
          if (!a.alias_list) {
            return 1;
          }
          if (!b.alias_list) {
            return -1;
          }
          return a.alias_list - b.alias_list;
        });
    default:
      return state;
  }
};

export default filteredItemsReducer;
