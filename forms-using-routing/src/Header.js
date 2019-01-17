import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <Link className="App-link" to='/home'>ReactDemo</Link>
                </div>
                <ul className="menu-list">
                    <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/signup" activeClassName="active" >Sign Up</NavLink></li>
                    <li><NavLink to="/signin" activeClassName="active">Sign In</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default Header;