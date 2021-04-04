import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  currentUser: null,
  token: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        token: action.token,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, currentUser: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
