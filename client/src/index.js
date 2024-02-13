import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducers } from './redux/reducers';
import { createStore, applyMiddleware, compose } from 'redux';

 ////////// Site Css Files////////////
 import  "./assets/vendor/animate.css/animate.min.css";
 import  "./assets/vendor/aos/aos.css";
 import  "./assets/vendor/bootstrap/css/bootstrap.min.css";
 import  "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
 import  "./assets/vendor/boxicons/css/boxicons.min.css";
 import  "./assets/vendor/glightbox/css/glightbox.min.css";
 import  "./assets/vendor/swiper/swiper-bundle.min.css";
 import  "./assets/css/style.css";
 ////////// Site JS Files////////////

 import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
