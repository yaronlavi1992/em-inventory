import {
  ADD_ITEM_QUANTITY,
  FETCH_ITEMS,
  FILTER_ITEMS,
  REDUCE_ITEM_QUANTITY,
} from '../actions/types';

// const INITIAL_STATE = [
//   { id: 'u1', name: 'lamp', quantity: 0, icon: 'lightbulb', packageFee: 10 },
//   { id: 'u2', name: 'bed', quantity: 0, icon: 'bed', packageFee: 15 },
//   {
//     id: 'u3',
//     name: 'wheelchair',
//     quantity: 0,
//     icon: 'wheelchair',
//     packageFee: 20,
//   },
//   { id: 'u4', name: 'tv', quantity: 0, icon: 'tv', packageFee: 25 },
//   { id: 'u5', name: 'lamp', quantity: 0, icon: 'lightbulb', packageFee: 10 },
//   { id: 'u6', name: 'bed', quantity: 0, icon: 'bed', packageFee: 15 },
//   {
//     id: 'u7',
//     name: 'wheelchair',
//     quantity: 0,
//     icon: 'wheelchair',
//     packageFee: 20,
//   },
//   { id: 'u8', name: 'tv', quantity: 0, icon: 'tv', packageFee: 25 },
//   { id: 'u9', name: 'lamp', quantity: 0, icon: 'lightbulb', packageFee: 10 },
//   { id: 'u10', name: 'bed', quantity: 0, icon: 'bed', packageFee: 15 },
//   {
//     id: 'u11',
//     name: 'wheelchair',
//     quantity: 0,
//     icon: 'wheelchair',
//     packageFee: 20,
//   },
//   { id: 'u12', name: 'tv', quantity: 0, icon: 'tv', packageFee: 25 },
// ];

// const itemsReducer = (state = INITIAL_STATE, action) => {
const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;

    case FILTER_ITEMS:
      // return INITIAL_STATE.filter(
      return action.payload.filter(
        (item) => item.parent_name.indexOf(action.input) !== -1
        // (item) => item.name.indexOf(action.input) !== -1
      );

    case ADD_ITEM_QUANTITY:
      state.find((item) => {
        return item.parent_name === action.payload;
        // return item.id === action.payload;
      }).quantity++;
      return [...state];

    case REDUCE_ITEM_QUANTITY:
      state.find((item) => {
        return item.parent_name === action.payload && item.quantity > 0;
        // return item.id === action.payload && item.quantity > 0;
      }).quantity--;
      return [...state];

    default:
      return state;
  }
};

export default itemsReducer;
