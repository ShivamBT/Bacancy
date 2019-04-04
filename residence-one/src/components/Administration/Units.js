import React, { Component } from "react";
import { getUnitList} from "../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import "./Units.css";
import { Link } from "react-router-dom";

export class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      current_page: 1,
      total_pages: "",
      search: {
        id: "",
        value: ""
      }
    };
    this.fetchData = this.fetchData.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
  }

  async paginationHandler(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
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
    this.fetchData();
  }

  async fetchData() {
    let result = await getUnitList(
      this.state.current_page,
      this.state.search,
      this.state.token
    );
    this.setState({
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });

    console.log("Result of unit is:", result);
  }

  async componentDidMount() {
      await this.setState({ token: localStorage.getItem("token") });
      this.fetchData();
  }

  render() {
    let columns = [
      {
        Header: "Unit Id",
        accessor: "officialId",
        Cell: row =>
        {
          return (
            <div>
              <Link to={`/administration/units-profile/${row.original.id}`}>{row.original.officialId}</Link>
            </div>
          )
          }
      },
      {
        Header: "Section",
        accessor: "section.name"
      },
      {
        Header: "Building",
        accessor: "building.name"
      },

      {
        Header: "Entry",
        accessor: "entry"
      },
      {
        Header: "level",
        accessor: "level"
      },
      {
        Header: "Location",
        accessor: "buildingId"
      },
      {
        Header: "Shares",
        accessor: "shares"
      },
      {
        Header: "Unit type",
        accessor: "unit_type.type"
      }
    ];
    return (
      <div className="unit">
        <div className="sidebar">
                <Sidebar {...this.props}/>
        </div>

        <div className="logout">
                <LogOutComponent {...this.props}/>
        </div>

        <div className="unitList">
          <h1 className="unitHeading">Units</h1>
          <ReactTable
            data={this.state.data}
            columns={columns}
            className="unitList"
            pages={this.state.total_pages}
            page={this.state.current_page - 1}
            manual
            onPageChange={pageIndex => this.paginationHandler(pageIndex)}
            onFilteredChange={this.onFilteredChange}
            onFetchData={this.fetchData}
            noDataText="Please Wait ..."
            sortable={true}
            filterable={true}
          />
        </div>
      </div>
    );
  }
}
