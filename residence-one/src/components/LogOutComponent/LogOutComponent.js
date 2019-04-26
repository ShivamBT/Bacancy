import React, { Component } from "react";
import { Button } from "reactstrap";
import { logOut } from "../ApiCalls/ApiCalls";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
var preferenceLogo = require("./PrefrenceLogo.png");

export class LogOutComponent extends Component {
  constructor(props) {
    super(props);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  logOutHandler = async () => {
    localStorage.removeItem("token");
    let result = await logOut();
    console.log("Result is :", result);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle>
            <img src={preferenceLogo} height="40" width="40" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.logOutHandler}>LogOut</DropdownItem>
            <DropdownItem>Prefrences</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}
