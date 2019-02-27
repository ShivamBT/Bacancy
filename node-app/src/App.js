import React, { Component } from "react";
import { Navbar, Nav, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";
import { Badge1 } from "./components/UI Components/UIComponent";

class App extends Component {
  render() {
    return (
      <div className="mainHeading">
        <div>
          <Badge1 />
        </div>

        <Navbar>
          <Nav>
            <h4>
              <Badge color="primary">
                <Link to="/" className="Link">UserList</Link>
              </Badge>
            </h4>
            &nbsp;&nbsp;
            <h4>
              <Badge color="primary">
                <Link to="/edit/0/0" className="Link">Create User</Link>
              </Badge>
            </h4>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default App;
