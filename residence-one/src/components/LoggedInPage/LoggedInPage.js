import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./LoggedInPage.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from "reactstrap";

export class LoggedInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logOutHandler = async () => {
    console.log("Logouthandler called");
    await localStorage.setItem("status", false);
    this.props.history.push("/");
  };

  render() {
    let status = localStorage.getItem("status");
    if (status) {
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

          {/* <div className="logOut">
            <h1>You are logged in</h1>
            <Button color="info" onClick={e => this.logOutHandler()}>
              Log Out
            </Button> 
      </div> */}
        </div>
      );
    } else {
      return this.props.history.push("/");
    }
  }
}
