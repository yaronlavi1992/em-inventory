import * as types from '../actions/types';

const INTIAL_STATE = {
  isBoxCalcTriggered: 0,
  isSmallStuffModalTriggered: false,
};

const triggersReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case types.TRIGGER_BOX_CALCULATOR:
      return {
        ...state,
        isBoxCalcTriggered: action.payload,
      };
    case types.TRIGGER_SMALL_STUFF_MODAL:
      return {
        ...state,
        isSmallStuffModalTriggered: true,
      };
    default:
      return state;
  }
};

export default triggersReducer;
