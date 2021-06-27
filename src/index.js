import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common.authorization = localStorage.getItem('bearer-token') || '';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
