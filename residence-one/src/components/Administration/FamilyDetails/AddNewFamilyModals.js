import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";

export class AddNewFamilyModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: {},
      unit_selectAll: 0,
      users: {},
      user_selectAll: 0,
      modal: false,
      current_page: 1,
      total_pages: "",
      currentActive: "units"
    };
    this.toggleRow = this.toggleRow.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async toggleModal() {
    if (this.state.currentActive === "units")
      await this.setState({
        modal: !this.state.modal,
        total_pages: "",
        current_page: 1,
        currentActive: "units"
      });
    this.fetchData();
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    this.fetchData();
  }

  async fetchData() {
    if (this.state.currentActive === "units") {
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
    } else if (this.state.currentActive === "users") {
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
  }

  async paginationHandler(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  toggleRow(firstName) {
    let var1 =
      this.state.currentActive === "units"
        ? this.state.units
        : this.state.users;
    let var2 = this.state.currentActive === "units" ? units : users;
    let var3 =
      this.state.currentActive === "units" ? unit_selectAll : user_selectAll;

    const newSelected = Object.assign({}, var1);
    newSelected[firstName] = !this.state.selected[firstName];
    this.setState({
      [var2]: newSelected,
      [var3]: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};
    let var1 =
      this.state.currentActive === "units"
        ? this.state.unit_selectAll
        : this.state.user_selectAll;

    if (var1 === 0) {
      this.state.data.forEach(x => {
        newSelected[x.firstName] = true;
      });
    }
    let var2 = this.state.currentActive === "units" ? units : users;
    let var3 =
      this.state.currentActive === "units" ? unit_selectAll : user_selectAll;

    this.setState({
      [var2]: newSelected,
      [var3]: var1 === 0 ? 1 : 0
    });
  }

  render() {
    let column1 = [
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
      },
      {
        Header: "Format"
      },
      {
        Header: "Surface Area"
      }
    ];
    let column2 = [
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
        id: "name",
        Header: "FullName",
        accessor: "fullName",
        width: 250,
        maxWidth: 250,
        minWidth: 250,
        filterable: true,
        Cell: row => {
          return (
            <div>
              <Link to={`/administration/users/${row.original.id}`}>
                {row.original.fullName}
              </Link>
            </div>
          );
        }
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
      }
    ];

    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader>Add New Family</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Select the unit</Label>
                <span>
                  <Input type="text" />{" "}
                  <Button value="units" onClick={e => this.toggleModal(e)}>
                    Select
                  </Button>
                </span>
              </FormGroup>
              <FormGroup>
                <Label>Select The Users</Label>
                <Input type="text" />{" "}
                <Button value="users" onClick={e => this.toggleModal(e)}>
                  Select
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success">Submit</Button>
            <Button color="danger" onClick={() => this.toggleModal("units")}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add New Family</ModalHeader>
          <ModalBody>
            <ReactTable
              data={this.state.data}
              columns={this.state.currentActive === "units" ? column1 : column2}
              className="unitList"
              pages={this.state.total_pages}
              page={this.state.current_page - 1}
              manual
              onPageChange={pageIndex => this.paginationHandler(pageIndex)}
              noDataText="Please Wait ..."
            />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.toggleModal("units")}>Submit</Button>
            <Button color="danger" onClick={() => this.toggleModal("units")}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
