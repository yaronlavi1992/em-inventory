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

export const fetchItems = (items) => {
  return {
    type: FETCH_ITEMS,
    payload: items,
  };
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
  const loginResult = await axios.post(
    // 'https://cors-anywhere.herokuapp.com/' +
    '/login',
    body,
    options
  );
  // console.log(loginResult);
  console.log(loginResult.data);

  dispatch({ type: SIGN_IN, payload: loginResult.data, token: userId });
  // return {
  //   type: SIGN_IN,
  //   payload: userId,
  // };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
