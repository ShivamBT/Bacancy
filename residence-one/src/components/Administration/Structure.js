import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import "./Structure.css";

export class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      total_pages: "",
      current_page: 1,
      selected: {},
      selectAll: 0,
      search: {
        id: null,
        value: null
      }
    };
    this.paginationHandler = this.paginationHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow(name) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  async onFilteredChange(e) {
    let search = { ...this.state.search };
    let i = e.length - 1;

    if (e.length === 0) {
      search["id"] = "";
      search["value"] = "";
    } else {
      search[`id`] = e[i].id;
      search[`value`] = e[i].value;
    }

    await this.setState({ search });
    console.log("e  is :", e);
    this.filterData();
  }

  async filterData() {
    let result = await axios.get(
      `http://localhost:8080/api/entry/structure?page=${
        this.state.current_page
      }&${this.state.search.id}=${this.state.search.value}`,
      {
        headers: {
          token: this.state.token
        }
      }
    );
    this.setState({ data: result.data.data });
  }

  async paginationHandler(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async fetchData() {
    let result = await axios.get(
      `http://localhost:8080/api/entry/structure?page=${
        this.state.current_page
      }`,
      {
        headers: {
          token: this.state.token
        }
      }
    );

    this.setState({
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });
    console.log("Result of structure is : ", result);
  }

  async componentDidMount() {
    let token = localStorage.getItem("token");
    await this.setState({ token });
    this.fetchData();
  }

  render() {
    let columns = [
      {
        id: "checkbox",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              checked={this.state.selected[original.name] === true}
              onChange={() => this.toggleRow(original.name)}
            />
          );
        },
        Header: x => {
          return (
            <input
              type="checkbox"
              checked={this.state.selectAll === 1}
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectAll === 2;
                }
              }}
              onChange={() => this.toggleSelectAll()}
            />
          );
        },
        sortable: false,
        width: 45
      },

      {
        Header: "Name",
        accessor: "name",
        filterable: true
      },
      {
        Header: "Building Id",
        accessor: "buildingId"
      },
      {
        Header: "Entry Code",
        accessor: "entryCode"
      },

      {
        Header: "Building Code",
        accessor: "building.buildingCode"
      },

      {
        Header: "Section Id",
        accessor: "building.section.id"
      }
    ];

    return (
      <div className="structure">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div className="structureList">
          <h1 className="structureHeading">Structure</h1>
          <ReactTable
            className="structureList -striped -highlight"
            data={this.state.data}
            columns={columns}
            noDataText="Please wait ..."
            sortable={true}
            filterable={true}
            onFilteredChange={this.onFilteredChange}
            showPageSizeOptions={false}
            pages={this.state.total_pages}
            page={this.state.current_page - 1}
            onPageChange={pageIndex => this.paginationHandler(pageIndex)}
            manual
            onFetchData={this.fetchData}
          />
        </div>
      </div>
    );
  }
}
