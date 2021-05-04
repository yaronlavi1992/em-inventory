import * as types from '../actions/types';

const itemsReducer = (state = [], action) => {
  let parentFound;
  switch (action.type) {
    case types.FETCH_ITEMS:
      return action.payload;

    case types.ADD_ITEM_QUANTITY:
      parentFound = state.find(
        (parent) => parent.item_ids === action.payload.itemId
      );
      if (parentFound) {
        // After we found the item, we should check if it has children or if it does not.
        //    - for items without children we increase quantity - as now
        //    - for items with children we only show selection pop-up and increase quantity if user selected something
        if (!parentFound.innerItems || parentFound.innerItems.length === 0) {
          parentFound.quantity += action.payload.itemCount;
        }
      } else {
        // its an innerItem
        state.forEach((parentItem) => {
          if (parentItem.innerItems !== undefined) {
            const foundInnerItem = parentItem.innerItems.find(
              (innerItem) =>
                Number(innerItem.item_id) === Number(action.payload.itemId)
            );
            if (foundInnerItem !== undefined) {
              parentItem.quantity += action.payload.itemCount;
              return (foundInnerItem.quantity += action.payload.itemCount);
            }
          }
        });
      }
      return [...state];

    case types.REDUCE_ITEM_QUANTITY:
      parentFound = state.find((parent) => parent.item_ids === action.payload);
      if (parentFound && parentFound.quantity > 0) {
        // its a parentItem
        if (parentFound.innerItems) {
          for (let i = 0; i < parentFound.innerItems.length; i++) {
            if (parentFound.innerItems[i].quantity > 0) {
              parentFound.innerItems[i].quantity--;
              break;
            }
          }
        }
        parentFound.quantity--;
      } else {
        // its an innerItem
        state.forEach((parentItem) => {
          if (parentItem.innerItems !== undefined) {
            const foundInnerItem = parentItem.innerItems.find(
              (innerItem) =>
                Number(innerItem.item_id) === Number(action.payload)
            );
            if (foundInnerItem !== undefined && foundInnerItem.quantity > 0) {
              parentItem.quantity--;
              return foundInnerItem.quantity--;
            }
          }
        });
      }
      return [...state];

    case types.STORE_INVENTORY:
      return state;

    case types.SUBMIT_INVENTORY:
      return state;

    default:
      return state;
  }
};

export default itemsReducer;
