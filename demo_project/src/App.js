import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header.js';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer'

class App extends Component {
  render() { 
    return (
      <div>
      <Header />
      <Body />
      <Footer />
      </div>
    );
  }
}

export default App;
