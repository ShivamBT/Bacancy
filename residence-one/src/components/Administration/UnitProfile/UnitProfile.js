import React, { Component } from "react";
import { getUnitDetails } from "../../ApiCalls/ApiCalls";
import { Sidebar } from "../../Sidebar/Sidebar";
import { LogOutComponent } from "../../LogOutComponent/LogOutComponent";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { FaEllipsisV } from "react-icons/fa";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import Toggle from "react-toggle";
import "react-toggle/style.css";

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
      dropDownValues: {
        section: null,
        type: null,
        format: null,
        building: null
      },

      dropDownOptions: {
        section: null,
        type: null,
        format: null,
        building: null
      },
      isLivableUnit: false,
      currentActive: "details",
      dropdownActive: "viewDetails"
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.dropDownHandler = this.dropDownHandler.bind(this);
    this.changeDropDown = this.changeDropDown.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  handleToggleChange(e) {
    console.log("e in livableunit toggle is :", e);
    this.setState({ isLivableUnit: e.target.checked });
  }

  changeDropDown(name, e) {
    console.log("name and e here is :", name, e);
    let dropDownValues = { ...this.state.dropDownValues };
    dropDownValues[name] = e;
    this.setState({ dropDownValues });
  }

  dropDownHandler(value) {
    this.setState({ dropdownActive: value });
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

    let var1 = [],
      var2 = [],
      var3 = [],
      var4 = [];
    for (let i = 0; i < result.data.data.sectionList.length; i++) {
      var1[i] = { label: result.data.data.sectionList[i].name, value: i + 1 };
    }

    for (let i = 0; i < result.data.data.unitTypeList.length; i++) {
      var2[i] = { label: result.data.data.unitTypeList[i].type, value: i + 1 };
    }

    for (let i = 0; i < result.data.data.unitFormatTypeList.length; i++) {
      var3[i] = {
        label: result.data.data.unitFormatTypeList[i].type,
        value: i + 1
      };
    }

    for (let i = 0; i < result.data.data.buildingList.length; i++) {
      var4[i] = { label: result.data.data.buildingList[i].name, value: i + 1 };
    }

    let dropDownOptions = { ...this.state.dropDownOptions };
    dropDownOptions["section"] = var1;
    dropDownOptions["type"] = var2;
    dropDownOptions["format"] = var3;
    dropDownOptions["building"] = var4;

    this.setState({ data: result.data.data, dropDownOptions });
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

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>
                Owner :{" "}
                {this.state.data === null || undefined
                  ? "No data"
                  : this.state.data.owner.name}
              </p>
            </div>
            <div>
              <span
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor:
                    this.state.data === null || undefined
                      ? "green"
                      : this.state.data.isLivableUnit === "1"
                      ? "green"
                      : "red",
                  borderRadius: "50%",
                  display: "inline-block"
                }}
              />
            </div>
          </div>

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
            <UncontrolledButtonDropdown>
              <DropdownToggle color="link">
                <FaEllipsisV />
              </DropdownToggle>
              <DropdownMenu>
                {this.state.dropdownActive === "viewDetails" ? (
                  <DropdownItem
                    onClick={() => this.dropDownHandler("editDetails")}>
                    Edit Details
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => this.dropDownHandler("viewDetails")}>
                    View Details
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>

          <div>
            {this.state.currentActive === "details" ? (
              this.state.dropdownActive === "viewDetails" ? (
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
                    Type :{" "}
                    {this.state.data === null || undefined
                      ? "No data"
                      : this.state.data.unit_type.type}
                  </p>
                  <p>
                    Shares:
                    {this.state.data === null || undefined
                      ? "No data"
                      : this.state.data.shares}
                  </p>
                </div>
              ) : (
                <div>
                  <Form>
                    <h3>Edit Unit Details</h3>
                    <FormGroup>
                      <Label>Section</Label>
                      <Select
                        value={this.state.dropDownValues.section}
                        components={makeAnimated()}
                        onChange={e => this.changeDropDown("section", e)}
                        options={this.state.dropDownOptions.section}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Type</Label>
                      <Select
                        value={this.state.dropDownValues.type}
                        components={makeAnimated()}
                        onChange={e => this.changeDropDown("type", e)}
                        options={this.state.dropDownOptions.type}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Format</Label>
                      <Select
                        value={this.state.dropDownValues.format}
                        components={makeAnimated()}
                        onChange={e => this.changeDropDown("format", e)}
                        options={this.state.dropDownOptions.format}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Building</Label>
                      <Select
                        value={this.state.dropDownValues.building}
                        components={makeAnimated()}
                        onChange={e => this.changeDropDown("building", e)}
                        options={this.state.dropDownOptions.building}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Select Entry</Label>
                      <Select />
                    </FormGroup>
                    <FormGroup>
                      <Label>Location</Label>
                      <Input type="text" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Shares</Label>
                      <Input type="number" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Surface Area</Label>
                      <Input type="text" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Is Livable Unit</Label>
                      <br />
                      <Toggle
                        checked={this.state.isLivableUnit}
                        onChange={e => this.handleToggleChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button color="info">Save</Button>
                      &nbsp;&nbsp;
                      <Button color="primary">Cancel</Button>
                    </FormGroup>
                  </Form>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
