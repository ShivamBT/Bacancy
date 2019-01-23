import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <Link to='/home'>React Demo</Link>
                </div>
                <ul className="menu-list">
                    <li><NavLink to="/Departments" activeClassName="active">Departments</NavLink></li>
                    <li><NavLink to="/Events" activeClassName="active" >Events</NavLink></li>
                    <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default Header;