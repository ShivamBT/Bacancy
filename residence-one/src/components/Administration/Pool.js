import React, { Component } from "react";
import { getPoolData, updatePoolStatus } from "./../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Select from "react-select";
import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./Pool.css";

export class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      current_page: 1,
      total_pages: "",
      statusString: "",
      poolAccessRulesCompliantString:"",
      dropDownValues: {
        status: { label: "All", value: 0 },
        poolAccessRulesCompliant: {
          label: "All",
          value: 0
        }
      }
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
    this.handleToggle = this.handleToggle.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.changeDropDown = this.changeDropDown.bind(this);
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
      await this.setState({ statusString });
    }

    if (name = "poolAccessRulesCompliant")
    {
      let poolAccessRulesCompliantString = "";
      if (e.label === "on" || e.label === "off")
      {
        poolAccessRulesCompliantString=`poolAccessRulesCompliant=${e.label === "on" ? 1:0}`
      }
      await this.setState({ poolAccessRulesCompliantString });
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
                onChange={e =>
                  this.handleToggle(row.original.id, "status", e)
                }
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
        filterable:true
      },
      {
        Header: "Exceptional Pool access compliant",

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
        }
      },
      {
        Header: "Allowed in Pool",

        Cell: row => {
          return (
            <div>
              <Toggle
                defaultChecked={Boolean(row.original.allowedInPool)}
                disabled
              />
            </div>
          );
        }
      },
      {
        Header: "Section",
        accessor: "family.families_units[0].unit.section.name"
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
          <h1>Pool</h1>

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
      </div>
    );
  }
}
