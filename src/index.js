import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
// const store = createStore(reducer, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

ReactDOM.render(
  <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
  <App />
  </Provider>
  ,document.getElementById('root')
);
