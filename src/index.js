import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import middleware from './middleware';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './sass/_custom-bootstrap.scss'


const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root')
)
