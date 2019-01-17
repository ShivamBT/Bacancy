
import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <a href="#">ReactDemo</a>
                </div>
                <ul className="menu-list">
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Technologies</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
        );
    }
}

export default Header;
