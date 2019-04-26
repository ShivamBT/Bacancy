import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getPurchaseSettings } from "../../ApiCalls/ApiCalls";
import { Sidebar } from "../../Sidebar/Sidebar";
import { LogOutComponent } from "../../LogOutComponent/LogOutComponent";
import { UncontrolledCollapse } from "reactstrap";
import { FaAngleDown } from "react-icons/fa";

export class PurchaseSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: []
    };
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    let result = await getPurchaseSettings(this.state.token);
    console.log("purchase settings are :", result);
    this.setState({ data: result.data.data });
  }

  render() {
    let column = [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Short Name",
        accessor: "shortName"
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
          <h1>Purchase Settings</h1>
          <div
            style={{
              border: "1px solid darkgray",
              backgroundColor: "white",
              padding: "10px"
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
              id="toggler"
              className="formHover">
              <div>
                <h2>Purchase Types</h2>
              </div>
              <div>
                <FaAngleDown />
              </div>
            </div>
            <UncontrolledCollapse toggler="#toggler">
              <ReactTable
                data={this.state.data}
                columns={column}
                style={{ backgroundColor: "#f9f9f9" }}
                defaultPageSize={5}
              />
            </UncontrolledCollapse>
          </div>
        </div>
      </div>
    );
  }
}
