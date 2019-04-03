import React, { Component } from "react";
import { getFamilyList, getSubFamilyData } from "../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import "./Families.css";
import { Link } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { FaEllipsisV } from "react-icons/fa";
import { AddNewFamilyModals } from "./FamilyDetails/AddNewFamilyModals";

export class Families extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      current_page: 1,
      total_pages: "",
      search: [],
      string: "",
      sorting: {
        sort: "",
        field: ""
      },
      active_bool: true,
      inactive_bool: false,
      user_bool: true,
      subData: [{ fullName: "ABC" }],
      imagePath: "",
      expanded: [],
      modalAddFamily: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
    this.onSortedChange = this.onSortedChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getSubTableData = this.getSubTableData.bind(this);
    this.handleExpanded = this.handleExpanded.bind(this);
    this.toggleAddFamily = this.toggleAddFamily.bind(this);
  }

  async toggleAddFamily() {
    await this.setState({ modalAddFamily: !this.state.modalAddFamily });
  }

  handleExpanded(expand) {
    this.setState({ expand });
  }

  async getSubTableData(id) {
    let result = await getSubFamilyData(id, this.state.token);
    await this.setState({
      subData: result.data.data.users,
      imagePath: result.data.imagePath
    });

    return result;
  }

  async clickHandler(e) {
    await this.setState({
      user_bool: e.target.value,
      active_bool: !this.state.active_bool,
      inactive_bool: !this.state.inactive_bool,
      current_page: 1
    });

    this.fetchData();
  }

  async onSortedChange(e) {
    let sorting = { ...this.state.sorting };
    console.log("e is :", e);
    sorting["sort"] = e[0].desc ? "desc" : "asc";

    sorting["field"] = e[0].id;
    await this.setState({ sorting: sorting });
    this.fetchData();
  }

  async paginationHandler(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async onFilteredChange(e) {
    let search = { ...this.state.search };
    let i = e.length - 1;

    if (e.length === 0) {
      search[0]["id"] = "";
      search[0]["value"] = "";
    } else {
      search = e;
    }

    let string = "";

    for (let i = 0; i < search.length; i++) {
      string = string + `${search[i].id}=${search[i].value}&`;
    }

    await this.setState({ search, string });
    console.log("e  is :", e);
    this.fetchData();
  }

  async fetchData() {
    let result = await getFamilyList(
      this.state.current_page,
      this.state.string,
      this.state.sorting,
      this.state.user_bool,
      this.state.token
    );
    this.setState({
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });

    console.log("Result is :", result);
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    console.log("component did mount called");
    this.fetchData();
  }

  componentDidUpdate() {
    console.log("component did update called");
  }

  render() {
    let columns = [
      {
        id: "name",
        Header: "Name",
        accessor: "name",
        Cell: row => {
          console.log("row is :", row);
          return (
            <div>
              <Link to={`/administration/family/${row.original.id}`}>
                {row.original.name}
              </Link>
            </div>
          );
        }
      },
      {
        id: "mainPerson_name",
        Header: "Main Person",
        accessor: "mainPerson.fullName",
        width: 150,
        Cell: row => {
          return (
            <div>
              <Link
                to={{
                  pathname: `/administration/users/${row.original.mainPersonId}`
                  // state: {
                  //   history: this.props.history.push("/userNotFound")
                  // }
                }}>
                {row.original.mainPerson === null || undefined
                  ? "No FullName Found "
                  : row.original.mainPerson.fullName}
              </Link>
            </div>
          );
        }
      },
      {
        id: "mainPerson_telephone",
        Header: "Mobile Number",
        accessor: "mainPerson.telephone"
      },

      {
        id: "mainPerson_personStatus",
        Header: "Owner/Renter",
        accessor: "mainPerson.personStatus"
      },
      {
        id: "families_units_unit_officialId",
        Header: "Main Unit",
        accessor: "families_units[0].unit.officialId"
      },
      {
        id: "families_units_unit_building_name",
        Header: "Building",
        accessor: "families_units[0].unit.building.name"
      },
      {
        id: "families_units_unit_shares",
        Header: "Shares",
        accessor: "families_units[0].unit.shares"
      }
    ];

    let columns2 = [
      {
        Header: "fullName",
        accessor: "fullName"
      },
      {
        Header: "",
        accessor: "picture",
        Cell: row => {
          let src = this.state.imagePath + row.original.picture;
          return <img src={src} height={100} width={100} />;
        }
      },
      {
        Header: "",
        accessor: "email"
      },
      {
        Header: "",
        accessor: "telephone"
      }
    ];

    return (
      <div className="family">
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>

        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div className="familyList">
          <h1 className="familyHeading">Families</h1>

          <div className="familyList">
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
          </div>
          <div className="familyList">
            <UncontrolledButtonDropdown>
              <DropdownToggle color="link">
                <FaEllipsisV />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.toggleAddFamily}>Add New Family</DropdownItem>
                <DropdownItem>Help</DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>

          <div>
            {/* <Modal isOpen={this.state.modalFamily} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                <h4>Add Family</h4>
              </ModalHeader>
              <ModalBody>
                <p>Main Unit Id</p>
                <span>
                  <input type="text" /> <Button color="primary">Select</Button>
                </span>
                <p>Main Reponsible Person</p>
                <span>
                  <input type="text" /> <Button color="primary">Select</Button>
                </span>
                <p>Name of new Family(optional)</p>
                <span>
                  <input type="text" />
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="success">Submit</Button>
                <Button color="danger" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal> */}
            <AddNewFamilyModals
              isOpen={this.state.modalAddFamily}
              toggle={this.toggleAddFamily}
            />
          </div>

          <ReactTable
            data={this.state.data}
            columns={columns}
            className="familyList"
            pages={this.state.total_pages}
            page={this.state.current_page - 1}
            manual
            onPageChange={pageIndex => this.paginationHandler(pageIndex)}
            onFilteredChange={this.onFilteredChange}
            onSortedChange={this.onSortedChange}
            noDataText="Please Wait ..."
            sortable={true}
            filterable={true}
            expanded={this.state.expanded}
            onExpandedChange={expand => this.setState({ expanded: expand })}
            SubComponent={row => {
              return (
                <div>
                  <ReactTable
                    data={this.state.subData}
                    columns={columns2}
                    defaultPageSize={6}
                    collapseOnDataChange={false}
                    onFetchData={() => this.getSubTableData(row.original.id)}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }
}
