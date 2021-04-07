import * as types from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  currentUser: null,
  token: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        token: action.token,
      };
    case types.SIGN_OUT:
      return { ...state, isSignedIn: false, currentUser: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
