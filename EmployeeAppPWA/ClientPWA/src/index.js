import React from 'react';
import ReactDOM from 'react-dom';
import { AzureAD } from 'react-aad-msal';
import './index.css';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import App from './App';
import { authProvider } from 'Unite/Components/authProvider';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <AzureAD provider={authProvider} reduxStore={store} forceLogin={true}>
    {({ accountInfo, authenticationState, error }) => {
            return (
              <AzureAD provider={authProvider} forceLogin={true}>
                <Provider store={store}>
                  <App />
                </Provider>
              </AzureAD>
            );
          }}
  </AzureAD>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
