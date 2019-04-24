import React, { Component } from "react";
import { getVehicleList } from "../ApiCalls/ApiCalls";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";

export class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      status: true,
      activeStatus: {
        activeTab: true,
        inactiveTab: false
      },
      current_page: 1,
      total_pages: "",
      imagePath: ""
    };

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  async clickHandler(e) {
    let status = e.target.value;
    let activeStatus = { ...this.state.activeStatus };
    activeStatus[e.target.name] = true;
    for (let x in activeStatus) {
      if (x !== e.target.name) activeStatus[x] = false;
    }
    await this.setState({
      status,
      activeStatus
    });

    this.fetchData();
  }

  async fetchData() {
    let result = await getVehicleList(
      this.state.current_page,
      this.state.status,
      this.state.token
    );

    this.setState({
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20),
      imagePath: result.data.vehicleImagePath
    });

    console.log("result of vehicle list is :", result);
  }

  async changeCurrentPage(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    this.fetchData();
  }

  render() {
    let column = [
      {
        Header: "Number Plate",
        accessor: "numberPlate"
      },
      {
        Header: "Brand",
        accessor: "brand"
      },
      {
        Header: "Model",
        accessor: "model"
      },
      {
        Header: "Color",
        accessor: "color"
      },
      {
        Header: "Main Driver"
      },
      {
        Header: "Photo",
        accessor: "photo",
        Cell: row => {
          return (
            <div>
              <img src={this.state.imagePath + row.original.photo} />
            </div>
          );
        }
      },
      {
        Header: "Active On",
        accessor: "",
        Cell: row => {
          if (
            this.state.data[row.index].lastMarkedActive === null ||
            this.state.data[row.index].lastMarkedActive === undefined
          ) {
            return "";
          } else {
            let i = this.state.data[row.index].lastMarkedActive.indexOf("T");
            let date = this.state.data[row.index].lastMarkedActive.substring(
              0,
              i
            );
            return `${date}`;
          }
        }
      }
    ];
    return (
      <div className="main">
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>

        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div style={{ marginLeft: "20%" }}>
          <h1>Vehicles</h1>
          <Nav tabs>
            <NavItem>
              <NavLink active={this.state.activeStatus.activeTab}>
                <Button
                  name="activeTab"
                  value={true}
                  color="link"
                  onClick={e => this.clickHandler(e)}>
                  Active
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.inactiveTab}>
                <Button
                  name="inactiveTab"
                  value={false}
                  color="link"
                  onClick={e => this.clickHandler(e)}>
                  Inactive
                </Button>
              </NavLink>
            </NavItem>
          </Nav>

          <ReactTable
            data={this.state.data}
            pages={this.state.total_pages}
            page={this.state.current_page - 1}
            columns={column}
            noDataText="Please Wait ...."
            showPageSizeOptions={false}
            className="-striped -highlight"
            onPageChange={pageIndex => this.changeCurrentPage(pageIndex)}
            manual
          />
        </div>
      </div>
    );
  }
}
