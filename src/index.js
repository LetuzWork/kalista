import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

import App from './App';
const app = initializeApp({
  apiKey: "AIzaSyCVVsClYzRZ0HP4vc7scbgmJsYnC6A3eXM",
  authDomain: "kalista-shop.firebaseapp.com",
  projectId: "kalista-shop",
  storageBucket: "kalista-shop.appspot.com",
  messagingSenderId: "305604760563",
  appId: "1:305604760563:web:521c7e5d336a3a4cfc7886",
  measurementId: "G-K9X204N2KX"
});
const db  = getFirestore(app);

ReactDOM.render(
<App db={db} />,
document.getElementById('root')
);
