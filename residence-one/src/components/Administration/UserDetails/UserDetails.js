import React, { Component } from "react";
import { getUserDetails } from "../../ApiCalls/ApiCalls";
import { Sidebar } from ".././.././Sidebar/Sidebar";
import { LogOutComponent } from ".././.././LogOutComponent/LogOutComponent";
import { Nav, NavLink, NavItem, Button } from "reactstrap";
import { DataHandler } from "./DataHandler";
import { Redirect,Link} from "react-router-dom";
export class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      imagePath: "http://localhost:8080/images/lacadenelle13008fr/users/",
      data: null,
      current_active: "profile",
      activeStatus: {
        profile: true,
        notifications: false,
        packets: false,
        preferences: false,
        role_history: false,
        group_history: false,
        ownership_history: false,
        family_history: false
      }
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
    console.log("Did mount called");
    if (this.props.match.params.id===null || undefined)
    {
      this.props.history.push("/userNotFound");
    }
    else
    {
      let data = {
        fullName: "Not Found",
        family: {
          mainPerson: {
            fullName: "Not Found"
          },
          families_units: [
            {
              unit: {
                officialId: "Not Found"
              }
            }
          ]
        },
        positions: {
          name: "Not Found"
        }
      }
      await this.setState({ token: localStorage.getItem("token") });
      let result = await getUserDetails(
        this.props.match.params.id,
        this.state.token
      );
      this.setState({ data: result.data.data || data});
      console.log("Result is :", result);

      
      }
  }
  
  componentWillMount()
  {
    console.log("Will mount called");
    if (this.props.match.params.id === null || undefined) {
      this.props.location.state.history();
    }

    else {
      let data = {
        fullName: "Not Found",
        family: {
          mainPerson: {
            fullName: "Not Found"
          },
          families_units: [
            {
              unit: {
                officialId: "Not Found"
              }
            }
          ]
        },
        positions: {
          name: "Not Found"
        }
      };

      this.setState({ data });
    }

  }

  render() {
    
    if(this.state.data !== null) {
      return (
        <div className="main">
          <div className="sidebar">
            <Sidebar {...this.props} />
          </div>

          <div className="logout">
            <LogOutComponent {...this.props} />
          </div>

          <h1
            style={{
              fontSize: "25px",
              marginLeft: "20%",
              textDecoration: "underline",
              textDecorationColor: "#4262f4"
            }}>
            User Profile : {this.state.data.fullName}
          </h1>
          <div className="familyName">
            <p>
              Family Name :{" "}
              {this.state.data.family === null || undefined
                ? "No Family name found"
                : this.state.data.family.mainPerson.fullName}
            </p>
          </div>
          <div className="mainDetails">
            <div>
              <p className="mainUnitId">
                Main Unit Id :{" "}
                {this.state.data.family === null || undefined
                  ? "No Main Unit Id Found"
                  : this.state.data.family.families_units[0].unit
                      .officialId}
              </p>
            </div>

            <div>
              <p className="resident">
                {this.state.data.positions.name} <span className="dot" />
              </p>
            </div>
          </div>

          <div className="mainBlock" style={{ marginLeft: "20%" }}>
            <Nav tabs>
              <NavItem>
                <NavLink active={this.state.activeStatus.profile}>
                  <Button
                    color="link"
                    value="profile"
                    onClick={e => this.clickHandler(e)}>
                    Profile
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={this.state.activeStatus.notifications}>
                  <Button
                    color="link"
                    value="notifications"
                    onClick={e => this.clickHandler(e)}>
                    Notifications
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
                <NavLink active={this.state.activeStatus.preferences}>
                  <Button
                    color="link"
                    value="preferences"
                    onClick={e => this.clickHandler(e)}>
                    Preferences
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={this.state.activeStatus.role_history}>
                  <Button
                    color="link"
                    value="role_history"
                    onClick={e => this.clickHandler(e)}>
                    Role history
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={this.state.activeStatus.group_history}>
                  <Button
                    color="link"
                    value="group_history"
                    onClick={e => this.clickHandler(e)}>
                    Group History
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeStatus.ownership_history}>
                  <Button
                    color="link"
                    value="ownership_history"
                    onClick={e => this.clickHandler(e)}>
                    Ownership history
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={this.state.activeStatus.family_history}>
                  <Button
                    color="link"
                    value="family_history"
                    onClick={e => this.clickHandler(e)}>
                    Family history
                  </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </div>

          <div className="dislayBlock">
            <DataHandler
              active={this.state.current_active}
              data={this.state.data}
            />
          </div> 
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
