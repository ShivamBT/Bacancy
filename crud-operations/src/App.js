import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {

    return (
      <div>
        <p className='heading'>
          User CRUD Application
        </p>
        <p className='subheading'>
          <NavLink exact to='/' className='link'>Record List</NavLink>
          &nbsp;|&nbsp;
          <span>
            <NavLink exact to='/edit/0/0' className='link'>Add Record</NavLink>
          </span>
          &nbsp;|&nbsp;
         
        </p>
      </div>
    );
  
  }

}

export default App;