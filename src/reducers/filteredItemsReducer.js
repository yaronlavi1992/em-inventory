import * as types from '../actions/types';

const filteredItemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_ITEMS:
      //TODO: add prioritization according to index of search term.
      //TODO: for example: when searching "t", it shows "ATV" first but "Table" shuold be before that.
      let lookup = [];
      if (!action.input) return action.payload;
      return action.payload
        .filter((item, index, self) => {
          let normalizedValue = item.parent_name.toLowerCase();

          if (normalizedValue.indexOf(action.input.toLowerCase()) !== -1) {
            if (lookup.indexOf(normalizedValue) === -1) {
              lookup.push(normalizedValue);
              return true;
            }
          }

          return false;
        })
        .sort((a, b) => {
          if (a.parent_name.length !== b.parent_name.length)
            // if lengths are different
            return a.parent_name.length - b.parent_name.length; // return shorter first
          if (
            // if indexes of search term are different
            a.parent_name.indexOf(action.input) !==
            b.parent_name.indexOf(action.input)
          )
            return (
              // return smaller index first
              a.parent_name.indexOf(action.input) -
              b.parent_name.indexOf(action.input)
            );
          return a.parent_name.localeCompare(b.parent_name);
        });
    default:
      return state;
  }
};

export default filteredItemsReducer;
