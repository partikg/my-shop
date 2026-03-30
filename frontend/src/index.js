import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { store } from './reduxtoolkit/store/store';
import { Provider } from 'react-redux'
import { CartProvider } from './Context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </React.StrictMode>
);