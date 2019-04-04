import React, { Component } from "react";
import { getUnitDetails } from "../../ApiCalls/ApiCalls";
import { Sidebar } from "../../Sidebar/Sidebar";
import { LogOutComponent } from "../../LogOutComponent/LogOutComponent";
import { Nav, NavItem, NavLink, Button } from "reactstrap";

export class UnitProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: null,
      activeStatus: {
        details: true,
        occupancy_history: false,
        issue_tracking: false,
        documents: false
      },
      currentActive: "details"
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    let activeStatus = { ...this.state.activeStatus };
    for (let x in activeStatus) {
      if (x !== e.target.value) activeStatus[x] = false;
    }
    activeStatus[e.target.value] = true;
    let currentActive = e.target.value;
    this.setState({ activeStatus, currentActive });
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    let result = await getUnitDetails(
      this.props.match.params.id,
      this.state.token
    );
    console.log("Result of unit details is :", result);
    this.setState({ data: result.data.data });
  }

  render() {
    return (
      <div className="main">
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>
        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div style={{ marginLeft: "20%" }}>
          <h2>
            Units Profile :{" "}
            {this.state.data === null || undefined
              ? "No data"
              : this.state.data.officialId}
          </h2>

          <p>
            Owner :{" "}
            {this.state.data === null || undefined
              ? "No data"
              : this.state.data.owner}
          </p>

          <Nav tabs>
            <NavItem>
              <NavLink active={this.state.activeStatus.details}>
                <Button
                  color="link"
                  value="details"
                  onClick={e => this.clickHandler(e)}>
                  Details
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.occupancy_history}>
                <Button
                  color="link"
                  value="occupancy_history"
                  onClick={e => this.clickHandler(e)}>
                  Occupancy History
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.issue_tracking}>
                <Button
                  color="link"
                  value="issue_tracking"
                  onClick={e => this.clickHandler(e)}>
                  Issue Tracking
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.activeStatus.documents}>
                <Button
                  color="link"
                  value="documents"
                  onClick={e => this.clickHandler(e)}>
                  Documents
                </Button>
              </NavLink>
            </NavItem>
          </Nav>

          <div>
            {this.state.currentActive === "details" ? (
              <div>
                <p>
                  Section:{" "}
                  {this.state.data === null || undefined
                    ? "No data"
                    : this.state.data.section.name}
                </p>
                <p>
                  Building :
                  {this.state.data === null || undefined
                    ? "No data"
                    : this.state.data.building.name}{" "}
                </p>
                <p>
                  Type : {
                    this.state.data === null || undefined
                      ? "No data"
                      : this.state.data.unit_type.type}
                </p>
                <p>
                  Shares:{
                    this.state.data === null || undefined
                      ? "No data"
                      : this.state.data.shares}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
