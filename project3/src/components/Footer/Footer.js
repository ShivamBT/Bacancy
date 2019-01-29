
import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="logo logo2">
                    <a href="#">ReactDemo</a>
                </div>
                <ul className="bottom-menu-list">
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Quality Assurance</a></li>
                    <li><a href="#">Brochure</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        );
    }
}

export default Footer;
