import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.scss';

import { Provider } from 'react-redux';
import store from '../src/config/AppStore';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Provider store={store}>
    <App />
  </Provider>);
}
