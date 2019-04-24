import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { getPoolData, updatePoolStatus } from "./../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Select from "react-select";
import { Nav, NavItem, NavLink, Button, Jumbotron } from "reactstrap";
import "./Pool.css";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { PoolEntry } from "./PoolDetails/PoolEntry";
import { FaEllipsisV } from "react-icons/fa";

export class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      current_page: 1,
      total_pages: "",
      statusString: "",
      poolAccessRulesCompliantString: "",
      exceptionalPoolAccess: "",
      allowedInPool: "",
      dropDownValues: {
        status: { label: "All", value: 0 },
        poolAccessRulesCompliant: {
          label: "All",
          value: 0
        },
        exceptionalPoolAccess: {
          label: "All",
          value: 0
        },
        allowedInPool: {
          label: "All",
          valu: 0
        }
      },

      activeStatus: {
        dashboard: true,
        user_management: false,
        pool_entries: false,
        reporting: false,
        settings: false
      },
      currentActive: "dashboard",
      graphData: [],
      dropdownActive: "current_year"
    };
    this.option1 = [
      { label: "All", value: 0 },
      { label: "on", value: 1 },
      { label: "off", value: 2 }
    ];
    this.option2 = [
      { label: "All", value: 0 },
      { label: "on", value: 1 },
      { label: "off", value: 2 }
    ];

    this.option3 = [
      { label: "All", value: 0 },
      { label: "on", value: 1 },
      { label: "off", value: 2 }
    ];

    this.option4 = [
      { label: "All", value: 0 },
      { label: "on", value: 1 },
      { label: "off", value: 2 }
    ];

    this.handleToggle = this.handleToggle.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.changeDropDown = this.changeDropDown.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.dropDownHandler = this.dropDownHandler.bind(this);
  }

  async dropDownHandler(value)
  {
    await this.setState({ dropdownActive: value });
  }

  async clickHandler(e) {
    let activeStatus = { ...this.state.activeStatus };

    activeStatus[e.target.value] = true;

    for (let x in activeStatus) {
      if (x !== e.target.value) {
        activeStatus[x] = false;
      }
    }

    let currentActive = e.target.value;

    await this.setState({ activeStatus, currentActive });
  }

  async changeDropDown(name, e) {
    let dropDownValues = { ...this.state.dropDownValues };
    dropDownValues[name] = e;
    this.setState({ dropDownValues });
    if (name === "status") {
      let statusString = "";

      if (e.label === "on" || e.label === "off") {
        statusString = `status=${e.label === "on" ? 1 : 0}`;
      }
      await this.setState({ statusString, current_page: 1 });
    }

    if (name === "poolAccessRulesCompliant") {
      let poolAccessRulesCompliantString = "";
      if (e.label === "on" || e.label === "off") {
        poolAccessRulesCompliantString = `poolAccessRulesCompliant=${
          e.label === "on" ? 1 : 0
        }`;
      }
      await this.setState({
        poolAccessRulesCompliantString,
        current_page: 1
      });
    }

    if (name === "exceptionalPoolAccess") {
      let exceptionalPoolAccess = "";
      if (e.label === "on" || e.label === "off") {
        exceptionalPoolAccess = `manualPoolAccess=${e.label === "on" ? 1 : 0}`;
      }
      await this.setState({ exceptionalPoolAccess, current_page: 1 });
    }

    if (name === "allowedInPool") {
      let allowedInPool = "";
      if (e.label === "on" || e.label === "off") {
        allowedInPool = `allowedInPool=${e.label === "on" ? 1 : 0}`;
      }
      await this.setState({ allowedInPool, current_page: 1 });
    }

    this.fetchData();
  }
  async changeCurrentPage(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async handleToggle(id, name, e) {
    let object = {
      field: name,
      status: e.target.checked
    };
    let result = await updatePoolStatus(id, object, this.state.token);
    console.log("hnadle toggle : ", result);
    this.fetchData();
  }

  async fetchData() {
    let result = await getPoolData(
      this.state.current_page,
      this.state.statusString,
      this.state.poolAccessRulesCompliantString,
      this.state.exceptionalPoolAccess,
      this.state.allowedInPool,
      this.state.token
    );
    this.setState({
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });
    console.log("result is :", result);
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });

    this.fetchData();
  }

  render() {
    let column = [
      {
        Header: "Main Unit Id",
        accessor: "family.families_units[0].unit.officialId"
      },
      {
        Header: "Position",
        accessor: "personStatus"
      },
      {
        Header: "Name",
        accessor: "fullName"
      },
      {
        Header: "Nb Guests Remaining",
        accessor: "poolEntryNumbers.allowedGuestInPool"
      },
      {
        Header: "Profile Picture",
        accessor: "picture"
      },
      {
        Header: "Active",

        Filter: row => {
          return (
            <div>
              <Select
                options={this.option1}
                onChange={e => this.changeDropDown("status", e)}
                value={this.state.dropDownValues.status}
              />
            </div>
          );
        },
        Cell: row => {
          return (
            <div>
              <Toggle
                checked={row.original.status === "1" ? true : false}
                onChange={e => this.handleToggle(row.original.id, "status", e)}
              />
            </div>
          );
        },
        filterable: true
      },
      {
        Header: "Pool Access Rule Compliant",
        Filter: row => {
          return (
            <div>
              <Select
                options={this.option2}
                onChange={e =>
                  this.changeDropDown("poolAccessRulesCompliant", e)
                }
                value={this.state.dropDownValues.poolAccessRulesCompliant}
              />
            </div>
          );
        },
        Cell: row => {
          return (
            <div>
              <Toggle
                defaultChecked={row.original.poolAccessRulesCompliant}
                disabled
              />
            </div>
          );
        },
        filterable: true
      },
      {
        Header: "Exceptional Pool access compliant",
        Filter: row => {
          return (
            <div>
              <Select
                options={this.option3}
                onChange={e => this.changeDropDown("exceptionalPoolAccess", e)}
                value={this.state.dropDownValues.exceptionalPoolAccess}
              />
            </div>
          );
        },

        Cell: row => {
          return (
            <div>
              <Toggle
                checked={row.original.manualPoolAccess}
                onChange={e =>
                  this.handleToggle(row.original.id, "manualPoolAccess", e)
                }
              />
            </div>
          );
        },
        filterable: true
      },
      {
        Header: "Allowed in Pool",
        Filter: row => {
          return (
            <div>
              <Select
                options={this.option4}
                onChange={e => this.changeDropDown("allowedInPool", e)}
                value={this.state.dropDownValues.allowedInPool}
              />
            </div>
          );
        },

        Cell: row => {
          return (
            <div>
              <Toggle
                defaultChecked={Boolean(row.original.allowedInPool)}
                disabled
              />
            </div>
          );
        },
        filterable: true
      },
      {
        Header: "Section",
        accessor: "family.families_units[0].unit.section.name"
      }
    ];
    return (
      <div className="main">
        <Helmet>
          <title>Pool Data</title>
          <meta
            name="description"
            content="This page is rendering the Pool data of users"
          />
        </Helmet>
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>
        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div style={{ marginLeft: "20%" }}>
          <Nav tabs>
            <NavItem>
              <NavLink active={this.state.activeStatus.dashboard}>
                <Button
                  color="link"
                  value="dashboard"
                  onClick={e => this.clickHandler(e)}>
                  Dashboard
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.user_management}>
                <Button
                  color="link"
                  value="user_management"
                  onClick={e => this.clickHandler(e)}>
                  User Management
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.pool_entries}>
                <Button
                  color="link"
                  value="pool_entries"
                  onClick={e => this.clickHandler(e)}>
                  Pool entries
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.reporting}>
                <Button
                  color="link"
                  value="reporting"
                  onClick={e => this.clickHandler(e)}>
                  Reporting
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.settings}>
                <Button
                  color="link"
                  value="settings"
                  onClick={e => this.clickHandler(e)}>
                  Settings
                </Button>
              </NavLink>
            </NavItem>
          </Nav>

          {this.state.currentActive === "dashboard" ? (
            <div>
              <Jumbotron>
                <Helmet>
                  <title>Dashboard</title>
                  <meta name="description" content="Dashboard of Pool Page" />
                </Helmet>
                <h4>Dashboard</h4>
                <p>This is the Dashboard</p>
              </Jumbotron>
            </div>
          ) : this.state.currentActive === "user_management" ? (
            <div>
              <Helmet>
                <title>User Management</title>
                <meta
                  name="description"
                  content="User Management data of pool users"
                />
              </Helmet>
              <ReactTable
                data={this.state.data}
                columns={column}
                pages={this.state.total_pages}
                page={this.state.current_page - 1}
                noDataText="Please Wait ...."
                showPageSizeOptions={false}
                className="-striped -highlight"
                onPageChange={pageIndex => this.changeCurrentPage(pageIndex)}
                manual
              />
            </div>
          ) : (
            <div>
              <Helmet>
                <title>Pool User Graph</title>
                <meta name="description" content=" Graph data of pool users" />
              </Helmet>
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link">
                  <FaEllipsisV />
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.dropdownActive === "current_year" ? (
                    <DropdownItem
                      onClick={() => this.dropDownHandler("last_year")}>
                      Last Year
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => this.dropDownHandler("current_year")}>
                      Current Year
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <PoolEntry dropdownActive={this.state.dropdownActive} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
