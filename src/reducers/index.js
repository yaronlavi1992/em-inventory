import { combineReducers } from 'redux';
import authReducer from './authReducer';
import filteredItemsReducer from './filteredItemsReducer';
import itemsReducer from './itemsReducer';
import itemsSearchInputReducer from './itemsSearchInputReducer';
import triggersReducer from './triggersReducer';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  triggers: triggersReducer,
  filteredItems: filteredItemsReducer,
  itemsSearchInput: itemsSearchInputReducer,
});
