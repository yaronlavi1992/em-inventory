import * as types from '../actions/types';

const filteredItemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FILTER_ITEMS:
      let lookup = [];
      if(!action.input) return action.payload;
      return action.payload
        .filter(
          (item, index, self) => {
            
            let normalizedValue = item.parent_name
              .toLowerCase();
            
            if(normalizedValue.indexOf(action.input.toLowerCase()) !== -1){
              //R: looup dictionary is one of the simple ways to eliminate duplicates
              if(lookup.indexOf(normalizedValue) === -1){
                lookup.push(normalizedValue);
                return true;
              }
            }
            
            return false;
          }
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
