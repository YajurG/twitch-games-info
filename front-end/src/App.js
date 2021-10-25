import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TopGames from './components/topGames';
import TopStreams from './components/topStreams';
import Header from './components/header';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";


const App = () => {

  const [expiryString, setExpiryString] = useState();
  const [twitchToken, setTwitchToken] = useState();

  // useEffect(() => {
  //   const getTwitchToken = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:8080/api/token");
  //       console.log(response)
  //       if (response.status != 200) {
  //         console.log("token access denied")
  //         return;
  //       }
  //       try {
  //         await localStorage.setItem("twitchToken", JSON.stringify(response.data.token));
  //         let expiry_date = new Date();
  //         expiry_date.setSeconds(expiry_date.getSeconds() + parseInt(response.data.expires_in));
  //         await localStorage.setItem("twitchTokenExpiry", expiry_date.toString());
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //     console.log(localStorage);
  //   }
  //   const getExpiryString = async () => {
  //      setExpiryString(await localStorage.getItem("twitchTokenExpiry"));
  //   }
  //   const getStorageToken = async () => {
  //     setTwitchToken(await localStorage.getItem("twitchToken"));
  //   }
  //   getExpiryString();
  //   let date_now = new Date();
  //   let date_expires = new Date(expiryString);
  //   if (date_expires - date_now < 1800000) { // exp within 30 min
  //     getTwitchToken()
  //     console.log("retrieved new token XDXD");
  //   } else {
  //     console.log("token still valid XDXD")
  //   }
  // })

  return (
    <Router>
      <Header />
      <Route exact path = '/' component={TopGames}/>
      <Route exact path = '/top-streams' component={TopStreams}/>
    </Router>
    
  );
}

export default App;

