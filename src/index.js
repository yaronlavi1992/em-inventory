import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import App from './components/App/App';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'semantic-ui-css/semantic.min.css';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['triggers'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);
