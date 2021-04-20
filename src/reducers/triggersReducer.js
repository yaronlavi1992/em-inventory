import * as types from '../actions/types';

const INTIAL_STATE = {
  isBoxCalcTriggered: 0,
  isAllItemsModalTriggered: false,
};

const triggersReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case types.TRIGGER_BOX_CALCULATOR:
      return {
        ...state,
        isBoxCalcTriggered: action.payload,
      };
    case types.TRIGGER_ALLITEMS_MODAL:
      return {
        ...state,
        isAllItemsModalTriggered: true,
      };
    default:
      return state;
  }
};

export default triggersReducer;
