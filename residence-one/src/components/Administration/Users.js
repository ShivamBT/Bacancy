import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Dashboard } from "../Dashboard/Dashboard";
import "./Users.css";
import { Button, ButtonGroup } from "reactstrap";
import { getUserList } from "../ApiCalls/ApiCalls";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      active_bool: true,
      inactive_bool: false,
      imagePath: "",
      user_bool: true,
      total_pages: '',
      current_page:1
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  async clickHandler(e) {
    await this.setState({ user_bool: e.target.value ,current_page:1});
    let result = await getUserList(this.state.user_bool, this.state.current_page,this.state.token);
    this.setState({
      data: result.data.data,
      active_bool: !this.state.active_bool,
      inactive_bool: !this.state.inactive_bool,
      imagePath: result.data.imagePath,
      total_pages: Math.ceil((result.data.totalRecords) / 20)
    });
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    let result = await getUserList(true,this.state.current_page, this.state.token);
    this.setState({
      data: result.data.data,
      imagePath: result.data.imagePath,
      total_pages: Math.ceil((result.data.totalRecords) / 20)
    });

    console.log("Result is : ", result);
  }

  async changeCurrentPage(pageIndex)
  {
    await this.setState({ current_page: pageIndex + 1 }); 
    this.fetchData();
  }

  async fetchData()
  {
    let result = await getUserList(this.state.user_bool, this.state.current_page, this.state.token);
    this.setState({
      data: result.data.data,
      imagePath: result.data.imagePath,
      total_pages: Math.ceil((result.data.totalRecords) / 20)
    });

    console.log("Result is :", result);
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
        Header: "Profile Picture",
        accessor: "picture",
        width: 200,
        maxWidth: 200,
        minWidth: 200,
        Cell: row => {
          return (
            <div>
              <img
                height="30"
                src={this.state.imagePath + row.original.picture}
              />
            </div>
          );
        }
      },

      {
        Header: "Status",
        accessor: "status",
        
      },

      {
        Header: "Main Unit Id"
      },

      {
        Header: "Position",
        accessor: "personStatus",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header:"Building"
      },

      {
        Header:"Type of Unit"
      },

      {
        Header: "Entry"
      },


      {
        Header: "Email",
        accessor: "email",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header: "Date of Birth",
        accessor:"dateOfBirth"
      },

      {
        Header: "Mobile No",
        accessor:"telephone"
      }
      
    ];
    return (
      <div className="main">
        <div className="loggedInPage">
          <Sidebar />
        </div>

        <div className="logout">
          <LogOutComponent {...this.props}/>
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
              pages={this.state.total_pages}
              page={this.state.current_page-1}
              columns={columns}
              filterable
              noDataText="Please Wait ...."
              defaultPageSize={10}
              className="-striped -highlight"
              onPageChange={(pageIndex) => this.changeCurrentPage(pageIndex)}
              manual
              onFetchData={this.fetchData}
            />
          </div>
        </div>
      </div>
    );
  }
}
