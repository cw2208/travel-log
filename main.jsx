import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './components/App'
import {BrowserRouter} from 'react-router-dom';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCav9IcwBcGMY53Y1i6puyqN__uF2VK7ws",
  authDomain: "travelog-31419.firebaseapp.com",
  databaseURL: "https://travelog-31419-default-rtdb.firebaseio.com",
  projectId: "travelog-31419",
  storageBucket: "travelog-31419.firebasestorage.app",
  messagingSenderId: "817363884839",
  appId: "1:817363884839:web:a32cde4421fdab8c55a702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
