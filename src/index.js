import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootswatch/dist/flatly/bootstrap.min.css';
import './index.css'

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
