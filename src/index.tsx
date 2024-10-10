import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.scss'; // Assuming Webpack is set up to handle SCSS

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
