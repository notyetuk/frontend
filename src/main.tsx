import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <div className="smooth">
      <App/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
