import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
        <p style={{textAlign:"right",padding:'30px',margin:'0px'}}>New user? <br/><NavLink to="/signup" className="App-link"> Create account now!</NavLink></p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to ReactDemo!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
        <div >
          
        </div>
      </div>
    );
  }
}

export default App;
