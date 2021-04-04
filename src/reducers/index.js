import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';
import itemsSearchInputReducer from './itemsSearchInputReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  itemsSearchInput: itemsSearchInputReducer,
  form: formReducer,
});
