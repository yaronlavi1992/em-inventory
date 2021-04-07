import { combineReducers } from 'redux';
import authReducer from './authReducer';
import filteredItemsReducer from './filteredItemsReducer';
import itemsReducer from './itemsReducer';
import itemsSearchInputReducer from './itemsSearchInputReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  filteredItems: filteredItemsReducer,
  itemsSearchInput: itemsSearchInputReducer,
});
