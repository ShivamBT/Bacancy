import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown
} from "reactstrap";
import { FaEllipsisV } from "react-icons/fa";
import { bulkNotifications } from "../../ApiCalls/ApiCalls";

export class NotifyDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dropdown: false,
        token:''
    };

    this.toggleAction = this.toggleAction.bind(this);
    this.sendBulkNotifications = this.sendBulkNotifications.bind(this);
  }

  componentDidMount() {
      this.setState({ dropdown: false ,token:localStorage.getItem("token") });
      
  }

  toggleAction() {
    if (this.props.currentActive === "packet_in")
      this.setState({ dropdown: true });
    else this.setState({ dropdown: false });
  }

  async sendBulkNotifications() {
    let array = [];
    let result = await bulkNotifications(array ,this.state.token);
    console.log("Send notification result :", result);
  }

  render() {
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggleAction}>
          <DropdownToggle color="link">
            <FaEllipsisV />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.sendBulkNotifications}>
              Send Notifications
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}
