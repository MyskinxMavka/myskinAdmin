import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify';

const client = new ApolloClient({
  uri: 'https://myskinbackend.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
