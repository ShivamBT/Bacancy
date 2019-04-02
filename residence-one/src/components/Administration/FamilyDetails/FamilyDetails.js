import React, { Component } from "react";
import { getFamilyData } from "../../ApiCalls/ApiCalls";
import { Sidebar } from "../../Sidebar/Sidebar";
import { LogOutComponent } from "../../LogOutComponent/LogOutComponent";
import "./FamilyDetails.css";
import { Nav, NavLink, NavItem, Button } from "reactstrap";
import { FamilyDataHandler } from "./FamilyDataHandler";

export class FamilyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: null,
      activeStatus: {
        residents: true,
        extended_members: false,
        personnel: false,
        temporary_resident: false,
        documents: false,
        units: false,
        vehicles: false,
        packets: false,
        purchases: false
      },
      current_active: "residents"
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    let activeStatus = { ...this.state.activeStatus };
    activeStatus[e.target.value] = true;
    for (let x in activeStatus) {
      if (x !== e.target.value) {
        activeStatus[x] = false;
      }
    }

    let current_active = e.target.value;
    this.setState({ activeStatus, current_active });
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    let result = await getFamilyData(
      this.props.match.params.id,
      "active",
      "residents",
      this.state.token
    );
    this.setState({ data: result.data.data });
    console.log("result of family details :", result);
  }
  render() {
    if (this.state.data !== null) {
      return (
        <div>
          <div className="sidebar">
            <Sidebar {...this.props} />
          </div>

          <div className="logout">
            <LogOutComponent {...this.props} />
          </div>

          <div>
            <div style={{ marginLeft: "20%", fontSize: "20px" }}>
              <p>
                Main Unit Id :{" "}
                {this.state.data.families_units[0] === undefined ||
                this.state.data.families_units[0] === null
                  ? "No Id Found"
                  : this.state.data.families_units[0].unit.officialId}
              </p>{" "}
              {}
            </div>
            <div
              style={{
                marginLeft: "20%",
                fontSize: "20px",
                display: "flex",
                justifyContent: "space-between"
              }}>
              <div>
                <p>
                  Person Responsible : {this.state.data.mainPerson.fullName}
                </p>
              </div>
              <div>
                <p>
                  {this.state.data.mainPerson.personStatus}{" "}
                  <span className="dot" />
                </p>
              </div>
            </div>

            <div
              style={{
                marginLeft: "20%",
                border: "1px solid darkgray",
                fontSize: "4px"
              }}>
              <Nav tabs>
                <NavItem>
                  <NavLink active={this.state.activeStatus.residents}>
                    <Button
                      color="link"
                      value="residents"
                      onClick={e => this.clickHandler(e)}>
                      Residents
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.activeStatus.extended_members}>
                    <Button
                      color="link"
                      value="extended_members"
                      onClick={e => this.clickHandler(e)}>
                      Extended Members
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.activeStatus.personnel}>
                    <Button
                      color="link"
                      value="personnel"
                      onClick={e => this.clickHandler(e)}>
                      Personnel
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.activeStatus.temporary_resident}>
                    <Button
                      color="link"
                      value="temporary_resident"
                      onClick={e => this.clickHandler(e)}>
                      Temporary Resident
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
                <NavItem>
                  <NavLink active={this.state.activeStatus.units}>
                    <Button
                      color="link"
                      value="units"
                      onClick={e => this.clickHandler(e)}>
                      Units
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.activeStatus.vehicles}>
                    <Button
                      color="link"
                      value="vehicles"
                      onClick={e => this.clickHandler(e)}>
                      Vehicles
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.activeStatus.packets}>
                    <Button
                      color="link"
                      value="packets"
                      onClick={e => this.clickHandler(e)}>
                      Packets
                    </Button>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink active={this.state.activeStatus.purchases}>
                    <Button
                      color="link"
                      value="purchases"
                      onClick={e => this.clickHandler(e)}>
                      Purchases
                    </Button>
                  </NavLink>
                </NavItem>
              </Nav>

              <div
                style={{
                  fontSize: "15px",
                  border: "1px solid darkgray"
                }}>
                <FamilyDataHandler
                  current_active={this.state.current_active}
                  {...this.props}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading ...</p>
        </div>
      );
    }
  }
}
