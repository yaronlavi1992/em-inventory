import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <div className='ui one column stackable center aligned page grid'>
    <div id='mainWrapper' className='column twelve wide'>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
    <p
      className='white-text'
      style={{
        padding: '12px 0px 0px 0px',
        fontWeight: 'bolder',
      }}
    >
      * Your inventory affects your quote
    </p>
  </div>,
  document.querySelector('#root')
);
