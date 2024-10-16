import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './views/home/home';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  );
};

export default App;
