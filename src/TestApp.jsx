import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestApp() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function getDataFromServer(){
    console.log("button pressed");
    axios.get('http://localhost:5000/api/test')
      .then(response => {
        console.log("response:" + response);
        setData(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="TestApp">
      <h1>React and Node.js Integration</h1>
      <button onClick={getDataFromServer}>get data</button>
      <p>Message from the server: {data}</p>
    </div>
  );
}

export default TestApp;