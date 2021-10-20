import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { useEffect, useState } from 'react';


const App = () => {

  useEffect(() => {
    async function getTwitchToken() {
      try {
        const response = await axios.get(`http://localhost:8080/api/token`);
        if (res.status != 200) {
          console.log("token access denied")
          return;
        }
        try {
          localStorage.setItem("twitchToken", JSON.stringify(response.token));
          let expiry_date = new Date();
          expiry_date.setSeconds(expiry_date.getSeconds + parseInt(response.expires_in));
          localStorage.setItem("twitchTokenExpiry", expiry_date.toString());
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    let expiryString = localStorage.getItem("twitchTokenExpiry");
    const expiry = new Date(expiryString);
    const now = new Date();
    const difference = expiry - now;
    if (difference > 1800000) { // 30 minutes
        getTwitchToken();
    }
  }, [])

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
