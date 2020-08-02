import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history.js';
//import './index.css';
import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
    <App />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
