import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import { getOwnerList } from "../ApiCalls/ApiCalls";
import "./Owners.css";
import {
  Nav,
  NavLink,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import { FaEllipsisV } from "react-icons/fa";

export class Owners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      total_pages: "",
      current_page: 1,
      active_bool: true,
      inactive_bool: false,
      user_bool: true,
      newOwnerModal: false
    };
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ newOwnerModal: !this.state.newOwnerModal });
  }

  async clickHandler(e) {
    await this.setState({ user_bool: e.target.value, current_page: 1 });
    let result = await getOwnerList(
      this.state.user_bool,
      this.state.current_page,
      this.state.token
    );

    this.setState({
      data: result.data.data,
      active_bool: !this.state.active_bool,
      inactive_bool: !this.state.inactive_bool,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });
  }

  async changeCurrentPage(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async fetchData() {
    let result = await getOwnerList(
      this.state.user_bool,
      this.state.current_page,
      this.state.token
    );
    this.setState({
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });

    console.log("Result of owner list is :", result);
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });

    this.fetchData();
  }

  render() {
    let column = [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "Account Reference",
        accessor: "ownerAccRef"
      },
      {
        Header: "Total Units",
        accessor: "totalUnit"
      },
      {
        Header: "Total Shares",
        accessor: "totalShares"
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

        <div className="groupList">
          <h1>Owners</h1>

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
          <UncontrolledButtonDropdown>
            <DropdownToggle color="link">
              <FaEllipsisV />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.toggleModal}>
                Add new Owner
              </DropdownItem>
              <DropdownItem>
                Help
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Modal isOpen={this.state.newOwnerModal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Add new Owner</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>Account Reference</Label>
                  <Input type="number" />
                </FormGroup>
            
                <FormGroup>
                  <Label>Represented By User</Label>
                  <br />
                  <Button color="primary">Select User</Button>
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <Input type="text" />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success">Submit</Button>
              <Button color="danger" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>


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
            onFetchData={this.fetchData}
            filterable={true}
            sortable={true}
          />
        </div>
        {/* <p>Hello World</p> */}
      </div>
    );
  }
}
