import 'semantic-ui-css/semantic.min.css';
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
  <>
    <div
      className='ui one column stackable center aligned page grid'
      style={{ height: '100%' }}
    >
      <div id='mainWrapper' className='column twelve wide'>
        <Provider store={store}>
          <App />
        </Provider>
      </div>
      {
        //R: you can remove this paragraph here and place only in pages where it's required
        //R: also user <footer> tag instead of <p> - it's semantically better.
      }
    </div>
    <footer
      className='white-text'
      style={{
        padding: '12px 0px 0px 0px',
        fontWeight: 'bolder',
        textAlign: 'center',
      }}
    >
      * Your inventory affects your quote
    </footer>
  </>,
  document.querySelector('#root')
);
