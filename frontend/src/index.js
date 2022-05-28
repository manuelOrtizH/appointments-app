import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAS68xa0XdrhuOcUWibeEGoIv_B9i9-5uI",
  authDomain: "reservamedb.firebaseapp.com",
  databaseURL: "https://reservamedb-default-rtdb.firebaseio.com/",
  projectId: "reservamedb",
  storageBucket: "reservamedb.appspot.com",
  messagingSenderId: "928673305721",
  appId: "1:928673305721:web:009c55c036e5ec210670a8"
});

const db = getFirestore(firebaseApp);

ReactDOM.render(

  // <React.StrictMode>
    <App />

  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();