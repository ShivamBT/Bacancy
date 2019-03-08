import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from "reactstrap";
import { Dashboard } from "../Dashboard/Dashboard";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar
          color="faded"
          light
          style={{
            position: "absolute",
            backgroundColor: "#4c596e",
            color: "red"
          }}>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <h3>
                  <Badge color="dark">LA CADENELLE</Badge>
                </h3>
              </NavItem>
              <br />
              <NavItem>
                <Badge>
                  <h3>
                    <Link to="/dashboard" style={{ color: "white" }}>
                      Dashboard
                    </Link>
                  </h3>
                </Badge>
              </NavItem>
              <br />
              <NavItem>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Administration</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/administration/users">Users</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/administration/structure">Structure</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/administration/lots">Lots</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <br />
              <NavItem>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Application</DropdownToggle>
                  <DropdownMenu right />
                </UncontrolledDropdown>
              </NavItem>
              <br />
              <NavItem>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Council</DropdownToggle>
                  <DropdownMenu right />
                </UncontrolledDropdown>
              </NavItem>
              <br />

              <NavItem>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Public</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/public/blogs">Blogs</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/public/website">Website</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
