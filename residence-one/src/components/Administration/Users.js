import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { LoggedInPage } from "../LoggedInPage/LoggedInPage";
import "./Users.css";
import { Button, ButtonGroup } from "reactstrap";
import { getUserList } from "../ApiCalls/ApiCalls";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      active_bool: true,
      inactive_bool: false,
      imagePath: ""
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  async clickHandler(e) {
    let result = await getUserList(e.target.value, this.state.token);
    this.setState({
      data: result.data.data,
      active_bool: !this.state.active_bool,
      inactive_bool: !this.state.inactive_bool,
      imagePath: result.data.imagePath
    });
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    let result = await getUserList(true, this.state.token);
    this.setState({
      data: result.data.data,
      imagePath: result.data.imagePath
    });

    console.log("Result is : ", result);
  }

  render() {
    const columns = [
      {
        Header: "FullName",
        accessor: "fullName",
        width: 250,
        maxWidth: 250,
        minWidth: 250
      },
      {
        Header: "FirstName",
        accessor: "firstName",
        width: 200,
        maxWidth: 200,
        minWidth: 200
      },
      {
        Header: "LastName",
        accessor: "lastName",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Picture",
        accessor: "picture",
        width: 200,
        maxWidth: 200,
        minWidth: 200,
          Cell: row => { 
          return (
            <div>
              <img height='30' src={this.state.imagePath + row.original.picture} />
            </div>
          );
        }
      },

      {
        Header: "Email",
        accessor: "email",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Status",
        accessor: "status",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }
    ];
    return (
      <div>
        <div className="loggedInPage">
          <LoggedInPage />
        </div>

        <div className="userList">
          <h1 className="h1">Users</h1>
          <div>
            <ButtonGroup>
              <Button
                onClick={e => this.clickHandler(e)}
                value={true}
                active={this.state.active_bool}>
                Active
              </Button>
              <Button
                onClick={e => this.clickHandler(e)}
                value={false}
                active={this.state.inactive_bool}>
                Inactive
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <ReactTable
              data={this.state.data}
              columns={columns}
              filterable
              noDataText="Please Wait ...."
              defaultPageSize={10}
            />
          </div>
        </div>
      </div>
    );
  }
}
