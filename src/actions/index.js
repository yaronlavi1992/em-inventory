import axios from 'axios';
import {
  ADD_ITEM_QUANTITY,
  FETCH_ITEMS,
  REDUCE_ITEM_QUANTITY,
  FILTER_ITEMS,
  ITEMS_SEARCH_INPUT_CHANGE,
  SIGN_IN,
  SIGN_OUT,
} from './types';

export const fetchItems = () => async (dispatch) => {
  const options = {
    headers: {
      Accept: 'application/json',
    },
  };
  const itemsResult = await axios.get('/getInventoryListing', options);
  console.log(itemsResult.data);
  itemsResult.data = itemsResult.data.map((item) => ({ ...item, quantity: 0 }));
  dispatch({ type: FETCH_ITEMS, payload: itemsResult.data });
  // dispatch({ type: FETCH_ITEMS, payload: itemsResult.data.slice(0, 11) });
  // return {
  //   type: FETCH_ITEMS,
  //   payload: items,
  // };
};

export const filterItems = (items, input) => {
  return {
    type: FILTER_ITEMS,
    payload: items,
    input: input,
  };
};

export const itemsSearchInputChange = (input) => {
  return {
    type: ITEMS_SEARCH_INPUT_CHANGE,
    payload: input,
  };
};

export const addItemQuantity = (itemId) => {
  return {
    type: ADD_ITEM_QUANTITY,
    payload: itemId,
  };
};

export const reduceItemQuantity = (itemId) => {
  return {
    type: REDUCE_ITEM_QUANTITY,
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
  dispatch({ type: SIGN_IN, payload: loginResult.data, token: userId });
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
