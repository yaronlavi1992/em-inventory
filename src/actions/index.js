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
  itemsResult.data = itemsResult.data.map((item) => ({ ...item, quantity: 0 }));
  dispatch({ type: types.FETCH_ITEMS, payload: itemsResult.data });
  // dispatch({ type: types.FETCH_ITEMS, payload: itemsResult.data.slice(0, 11) });
};

export const filterItems = (items, input) => {
  return {
    type: types.FILTER_ITEMS,
    payload: items,
    input: input,
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

export const signOut = () => {
  return {
    type: types.SIGN_OUT,
  };
};
