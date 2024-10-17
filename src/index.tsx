import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n'; // Import i18n configuration

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
