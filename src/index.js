import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import {ClientsStore as clientsStore} from '../src/stores/ClientsStore'
import {ClientStore as clientStore} from '../src/stores/ClientStore'


const ClientsStore = new clientsStore()
const ClientStore = new clientStore()
const store = {ClientsStore, ClientStore} // nemes of the instatns of the store

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
