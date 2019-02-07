import React, { Component } from 'react';
import '../css/App.css';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <div>
                <h2>User CRUD Operation</h2>
        <NavLink exact to='/App' className="Navlink" activeClassName="active">
          Record List
        </NavLink> |
        <NavLink to='/App/New' className="Navlink" activeClassName="active">
          Add Record
        </NavLink>
            </div>
        );
    }
}
export default Header;