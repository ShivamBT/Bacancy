import React, { Component } from "react";
import { getOwnerProfile } from "../../ApiCalls/ApiCalls";
import { Sidebar } from "../../Sidebar/Sidebar";
import { LogOutComponent } from "../../LogOutComponent/LogOutComponent";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";

export class OwnersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: null,
      units: null,
      currentActive: "details"
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    this.setState({ currentActive: e.target.value });
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    let result = await getOwnerProfile(
      this.props.match.params.id,
      this.state.token
    );
    this.setState({ data: result.data.data, units: result.data.data.units });
  }

  render() {
    let column = [
      {
        Header: "Unit Id",
        accessor: "officialId"
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
        accessor: "entryId"
      },
      {
        Header: "Level",
        accessor: "level"
      },
      {
        Header: "Location",
        accessor: "location"
      },
      {
        Header: "Shares",
        accessor: "shares"
      },
      {
        Header: "Unit Type",
        accessor: "unit_type.type"
      },
      {
        Header: "Format",
        accessor: "unit_type_format.type"
      },
      {
        Header: "Surface Area",
        accessor: "surfaceArea"
      }
    ];
    return (
      <div className="main">
        <div className="sidebar">
          <Sidebar {...this.props}/>
        </div>
        <div className="logout">
          <LogOutComponent {...this.props}/>
        </div>

        <div style={{ marginLeft: "20%" ,fontSize:"15px"}}>
          <h2>
            Owners Profile :{" "}
            {this.state.data === null || undefined
              ? "NO name"
              : this.state.data.name}
          </h2>
        </div>
        <div style={{ marginLeft: "20%" }}>
          <Nav tabs>
            <NavItem>
              <NavLink active={this.state.currentActive === "details"}>
                <Button
                  value="details"
                  color="link"
                  onClick={e => this.clickHandler(e)}>
                  Details
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.currentActive === "units"}>
                <Button
                  value="units"
                  color="link"
                  onClick={e => this.clickHandler(e)}>
                  Units
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <div style={{ marginLeft: "20%" }}>
          {this.state.currentActive === "details" ? (
            <div>
              <p>
                Account Reference :{" "}
                {this.state.data === null || undefined
                  ? "No data"
                  : this.state.data.ownerAccRef}
              </p>

              <p>
                Total Shares :{" "}
                {this.state.data === null || undefined
                  ? "No data"
                  : this.state.data.totalShares}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p>
                    Total Units :{" "}
                    {this.state.data === null || undefined
                      ? "No data"
                      : this.state.data.units.length}
                  </p>
                </div>
                <div
                  style={{
                    boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.118)",
                    width: "400px",
                    marginRight: "20%",
                    border: "1px darkgray solid"
                  }}>
                  <p>
                    Address :{" "}
                    {this.state.data === null || undefined
                      ? "No data"
                      : this.state.data.address}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h3>
                  Total Shares :{" "}
                  {this.state.data === null || undefined
                    ? "No data"
                    : this.state.data.totalShares}
                  &nbsp;&nbsp; Total Units :
                  {this.state.data === null || undefined
                    ? "No data"
                    : this.state.data.units.length}
                </h3>
              </div>

              <ReactTable data={this.state.units} columns={column} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
