import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge ,Row,Col} from 'reactstrap';
import "./Navigation.css"

export const Navigation = () => {
    return (
        <div className="navlink">
            <Row>
                <Col xs="2">
                    <Badge><NavLink to="/" className="link1">Home</NavLink></Badge>        
                </Col>
                <Col xs="2">
                    <Badge><NavLink to="/aboutus" className="link1">About us</NavLink></Badge>
                </Col>
                <Col xs="1">
                    <Badge><NavLink to="/contactus" className="link1">Contact us</NavLink></Badge>
                </Col>
            </Row>
        </div>
    );
}