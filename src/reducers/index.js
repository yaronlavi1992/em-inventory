import { combineReducers } from 'redux';
import authReducer from './authReducer';
import filteredItemsReducer from './filteredItemsReducer';
import itemsReducer from './itemsReducer';
import itemsSearchInputReducer from './itemsSearchInputReducer';
import scrollReducer from './scrollReducer';
import triggersReducer from './triggersReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  scroll: scrollReducer,
  triggers: triggersReducer,
  filteredItems: filteredItemsReducer,
  itemsSearchInput: itemsSearchInputReducer,
});
