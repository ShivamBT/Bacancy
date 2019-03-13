import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Users.css";
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
  Input,
  UncontrolledDropdown,
  Collapse,
  Card,
  CardBody
} from "reactstrap";
import { getUserList, signupUser } from "../ApiCalls/ApiCalls";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import { FaEllipsisV } from "react-icons/fa";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      active_bool: true,
      inactive_bool: false,
      imagePath: "",
      user_bool: true,
      total_pages: "",
      current_page: 1,
      dropdownOpen: false,
      modal: false,
      actionDropDownOpen: false,
      selected: {},
      selectAll: 0,
      search: {
        id: "",
        value: ""
      },
      sort_data: {
        id: "",
        desc: ""
      },
      signup: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        //dateOfBirth: "",
        telephone: ""
      }
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
    this.sortingData = this.sortingData.bind(this);
    this.fetchSortedData = this.fetchSortedData.bind(this);
  }

  async sortingData(e) {
    await this.setState({ sort_data: e });
    console.log("sorting is: ", this.state.sort_data);
  }

  async fetchSortedData() {
    let result = await `http://localhost:8080/api/user/list?page=${
      this.state.current_page
    }&status=${this.state.user_bool}&{}`;
  }

  toggleRow(firstName) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[firstName] = !this.state.selected[firstName];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.firstName] = true;
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
    this.fetchData();
  }

  async clickHandler(e) {
    await this.setState({ user_bool: e.target.value, current_page: 1 });
    let result = await getUserList(
      this.state.user_bool,
      this.state.current_page,
      this.state.search,
      this.state.token
    );

    this.setState({
      data: result.data.data,
      active_bool: !this.state.active_bool,
      inactive_bool: !this.state.inactive_bool,
      imagePath: result.data.imagePath,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });
  }
  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  async toggleAction() {
    await this.setState({ actionDropDownOpen: !this.state.actionDropDownOpen });
  }

  changeValue(e) {
    let signup = { ...this.state.signup };
    signup[e.target.name] = e.target.value;
    this.setState({ signup });
  }

  async submitValue(e) {
    console.log("Submit Value called");
    let result = await signupUser(this.state.signup);
    // this.toggleModal();
  }

  async updateStatus(id) {
    /*   let result = await axios.get(`http://localhost:8080/api/user/updateStatus/:${id}/:true`, {
      headers: {
        token:this.state.token
      }
    });

    console.log("Status changed :", result);*/

    return;
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    this.fetchData();
  }

  async changeCurrentPage(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async fetchData() {
    let result = await getUserList(
      this.state.user_bool,
      this.state.current_page,
      this.state.search,
      this.state.token
    );
    this.setState({
      data: result.data.data,
      imagePath: result.data.imagePath,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });

    console.log("Result is :", result);
  }

  render() {
    const columns = [
      {
        id: "checkbox",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              checked={this.state.selected[original.firstName] === true}
              onChange={() => this.toggleRow(original.firstName)}
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
        id:"name",
        Header: "FullName",
        accessor: "fullName",
        width: 250,
        maxWidth: 250,
        minWidth: 250,
        filterable: true
      },

      {
        Header: "Profile Picture",
        accessor: "picture",
        width: 200,
        maxWidth: 200,
        minWidth: 200,
        Cell: row => {
          return (
            <div>
              <img
                height="30"
                src={this.state.imagePath + row.original.picture}
              />
            </div>
          );
        }
      },

      {
        Header: "Status",
        accessor: "status"
      },

      {
        Header: "Main Unit Id"
      },

      {
        Header: "Position",
        accessor: "personStatus",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header: "Building"
      },

      {
        Header: "Type of Unit"
      },

      {
        Header: "Entry"
      },

      {
        Header: "Email",
        accessor: "email",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header: "Date of Birth",
        accessor: "dateOfBirth"
      },

      {
        Header: "Mobile No",
        accessor: "telephone"
      },

      {
        Header: "Actions",

        Cell: row => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle>
                <FaEllipsisV />
              </DropdownToggle>
              <Collapse isOpen={!this.state.isOpen}>
                <DropdownMenu right className="dropDownMenu">
                  <DropdownItem onClick={this.updateStatus(row.original.id)}>
                    Deactivate User
                  </DropdownItem>
                </DropdownMenu>
              </Collapse>
            </UncontrolledDropdown>
          );
        }
      }
    ];
    return (
      <div className="main">
        <div className="loggedInPage">
          <Sidebar {...this.props} />
        </div>

        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Signup Form</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>First Name:</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={this.state.signup.firstName}
                    onChange={e => this.changeValue(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Last Name:</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={this.state.signup.lastName}
                    onChange={e => this.changeValue(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email :</Label>
                  <Input
                    type="email"
                    name="email"
                    value={this.state.signup.email}
                    onChange={e => this.changeValue(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password :</Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.signup.password}
                    onChange={e => this.changeValue(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Confirm Password :</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={this.state.signup.confirmPassword}
                    onChange={e => this.changeValue(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Mobile Number:</Label>
                  <Input
                    type="number"
                    name="telephone"
                    value={this.state.signup.telephone}
                    onChange={e => this.changeValue(e)}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.submitValue}>
                Submit
              </Button>
              <Button color="secondary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <div className="userList">
          <h1 className="h1">Users</h1>

          <Nav tabs>
            <NavItem>
              <NavLink active={this.state.active_bool}>
                <Button
                  color="link"
                  onClick={e => this.clickHandler(e)}
                  value={true}>
                  Active
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.inactive_bool}>
                <Button
                  color="link"
                  onClick={e => this.clickHandler(e)}
                  value={false}>
                  Inactive
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
          <div>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle>
                <FaEllipsisV />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.toggleModal}>Add User</DropdownItem>
                <DropdownItem>Help</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <ReactTable
              data={this.state.data}
              pages={this.state.total_pages}
              page={this.state.current_page - 1}
              columns={columns}
              filterable={true}
              onFilteredChange={this.onFilteredChange}
              noDataText="Please Wait ...."
              showPageSizeOptions={false}
              className="-striped -highlight"
              onSortedChange={this.sortingData}
              onPageChange={pageIndex => this.changeCurrentPage(pageIndex)}
              manual
              onFetchData={this.fetchData}
            />
          </div>
        </div>
      </div>
    );
  }
}
