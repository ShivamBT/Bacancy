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

import {
  FaRegCircle,
  FaRegBuilding,
  FaUser,
  FaAtom,
  FaUsers,
  FaUserSecret,
  FaCar,
  FaFileAlt,
  FaCalendarAlt,
  FaRegNewspaper,
  FaSwimmer,
  FaRegCheckCircle,
  FaRegAddressCard,
  FaCogs,
  FaGift,
  FaFlagCheckered
} from "react-icons/fa";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount() {
    let x = localStorage.getItem("token");
    if (x === null) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        {/* <Navbar
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
              
              <br />
              
                <UncontrolledDropdown>
                  <DropdownToggle caret>Application</DropdownToggle>
                  <DropdownMenu right />
                </UncontrolledDropdown>
            
              <br />
              
                <UncontrolledDropdown>
                  <DropdownToggle caret>Council</DropdownToggle>
                  <DropdownMenu right />
                </UncontrolledDropdown>
              
              <br />

              
                <UncontrolledDropdown>
                  <DropdownToggle caret>Public</DropdownToggle>
                    <DropdownItem>
                      <Link to="/public/blogs">Blogs</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/public/website">Website</Link>
                    </DropdownItem>
                </UncontrolledDropdown>
              
            </Nav>
          </Collapse>
        </Navbar>
         */}

        <Navbar
          color="faded"
          light
          style={{
            position: "absolute",
            backgroundColor: "#4c596e",
            color: "red"
          }}>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <div id="left" className="main-menu">
            <div className="head">LA CADENELLE</div>
            <Collapse isOpen={!this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle
                    nav
                    caret
                    className="col"
                    id="link1"
                    isOpen={this.state.isOpen}>
                    Administration
                  </DropdownToggle>
                  <DropdownMenu right id="drop">
                    <DropdownItem>
                      <FaRegCircle id="link1" />
                      <Link to="/administration/users" className="link">
                        Users
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaRegBuilding id="link1" />{" "}
                      <Link to="/administration/structure" className="link">
                        Structure
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaUser id="link1" />{" "}
                      <Link to="/administration/units" className="link">
                        Units
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaUsers id="link1" />{" "}
                      <Link to="/administration/families" className="link">
                        Families
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaAtom id="link1" />{" "}
                      <Link to="/" className="link">
                        Groups
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaUserSecret id="link1" />{" "}
                      <Link to="/" className="link">
                        Owners
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaCar id="link1" />{" "}
                      <Link to="/" className="link">
                        Vehicle
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaFileAlt id="link1" />{" "}
                      <Link to="/" className="link">
                        Document
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaCalendarAlt id="link1" />{" "}
                      <Link to="/" className="link">
                        Event
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaRegNewspaper id="link1" />{" "}
                      <Link to="/" className="link">
                        News feed
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaSwimmer id="link1" />{" "}
                      <Link to="/" className="link">
                        Pool
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaRegCheckCircle id="link1" />{" "}
                      <Link to="/" className="link">
                        Issue Tracking
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaRegAddressCard id="link1" />{" "}
                      <Link to="/" className="link">
                        Contact
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaCogs id="link1" />
                      <Link to="/" className="link">
                        Settings
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
            <Collapse isOpen={!this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle
                    nav
                    caret
                    isOpen={this.state.isOpen}
                    id="link1">
                    Application
                  </DropdownToggle>
                  <DropdownMenu right id="drop">
                    <DropdownItem>
                      <FaGift id="link1" />{" "}
                      <Link to="/application/reception" className="link">
                        Reception
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaSwimmer id="link1" />{" "}
                      <Link to="/apps/pools" className="link">
                        Pool
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaFlagCheckered id="link1" />
                      <Link to="/apps/reception" className="link">
                        Notification
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaCar id="link1" />{" "}
                      <Link to="/admin/pools" className="link">
                        Vehicle
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaRegCheckCircle id="link1" />{" "}
                      <Link to="/admin/pools" className="link">
                        Issue Tracking
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <FaRegAddressCard id="link1" />{" "}
                      <Link to="/admin/pools" className="link">
                        Contact
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
