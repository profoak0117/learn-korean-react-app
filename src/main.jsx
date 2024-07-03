import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import TestApp from './TestApp.jsx'
import './index.css'
import axios from 'axios';

let firstHangulJson;
  axios.get('http://localhost:5000/api/getNextWord')
    .then(response => {
      console.log("response: %j", response);
      firstHangulJson = response.data;
      console.log("firsthanguljson: %j", firstHangulJson);
      ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          {/* <TestApp /> */}
          <App firstHangulJson={firstHangulJson}/>
        </React.StrictMode>,
      )
    })
    .catch(error => {
      console.error(error);
    });
