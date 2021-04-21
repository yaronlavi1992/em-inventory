import axios from 'axios';
import * as types from './types';

export const fetchItems = () => async (dispatch) => {
  const options = {
    headers: {
      Accept: 'application/json',
    },
  };
  const itemsResult = await axios.get('/getInventoryListing', options);
  console.log(itemsResult.data);
  dispatch({ type: types.FETCH_ITEMS, payload: itemsResult.data });
};

export const filterItems = (items, input) => {
  return {
    type: types.FILTER_ITEMS,
    payload: items,
    input,
  };
};

export const itemsSearchInputChange = (input) => {
  return {
    type: types.ITEMS_SEARCH_INPUT_CHANGE,
    payload: input,
  };
};

export const addItemQuantity = (itemId) => {
  return {
    type: types.ADD_ITEM_QUANTITY,
    payload: itemId,
  };
};

export const reduceItemQuantity = (itemId) => {
  return {
    type: types.REDUCE_ITEM_QUANTITY,
    payload: itemId,
  };
};

export const signIn = (userId) => async (dispatch) => {
  const body = {
    token: userId,
  };
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const loginResult = await axios.post('/login', body, options);
  console.log(loginResult.data);
  dispatch({ type: types.SIGN_IN, payload: loginResult.data, token: userId });
};

export const storeInventory = (items, userId) => async (dispatch) => {
  // console.log(items);
  // console.log(userId);
  items = items.filter((item) => item.quantity > 0);
  const inventoryFromItems = [
    items.map((item) => {
      return {
        item_id: Number(
          item.innerItems ? item.innerItems[0].item_id : item.item_ids
        ),
        item_quantity: item.quantity,
        // TODO: take in account the case when innerItems have different sh_prices
        // special_handling:
        //   item.sh_price === 0 || typeof item.sh_price === 'string'
        //     ? 0
        //     : item.sh_price,
      };
    }),
  ];
  // console.log(inventoryFromItems);
  const body = {
    id: String(userId),
    inventory: inventoryFromItems,
  };
  const options = {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const storeResult = await axios.post('/storeInventory', body, options);
  // console.log(storeResult);
  dispatch({
    type: types.STORE_INVENTORY,
    payload: storeResult.data,
    token: userId,
  });
};

export const submitInventory = (items, userId) => async (dispatch) => {
  // console.log(items);
  // console.log(userId);
  items = items.filter((item) => item.quantity > 0);
  const inventoryFromItems = [
    items.map((item) => {
      return {
        item_id: Number(
          item.innerItems ? item.innerItems[0].item_id : item.item_ids
        ),
        item_quantity: item.quantity,
        // special_handling:
        //   item.sh_price === 0 || typeof item.sh_price === 'string'
        //     ? 0
        //     : item.sh_price,
      };
    }),
  ];
  // console.log(inventoryFromItems);
  const body = {
    id: String(userId),
    inventory: inventoryFromItems,
  };
  const options = {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const submitResult = await axios.post('/submitInventory', body, options);
  console.log(submitResult);
  dispatch({
    type: types.SUBMIT_INVENTORY,
    payload: submitResult.data,
    token: userId,
  });
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT,
  };
};

export const triggerBoxCalculator = (triggerState) => {
  return {
    type: types.TRIGGER_BOX_CALCULATOR,
    payload: triggerState,
  };
};

export const triggerAllItemsModal = () => {
  return {
    type: types.TRIGGER_ALLITEMS_MODAL,
  };
};
