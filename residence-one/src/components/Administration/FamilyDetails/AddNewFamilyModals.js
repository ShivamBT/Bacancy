import React, { Component } from "react";
import { getUserList, getUnitList } from ".././.././ApiCalls/ApiCalls";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
 
} from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";

export class AddNewFamilyModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: {},
      last_selected_unit: "",
      users: {},
      last_selected_user: "",
      modal: false,
      current_page: 1,
      total_pages: "",
      currentActive: "units",
      search: {
        id: "",
        value: ""
      }
    };
    this.toggleRow = this.toggleRow.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async toggleModal(e) {
    await this.setState({
      modal: !this.state.modal,
      total_pages: "",
      current_page: 1,
      currentActive: e.target.value
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

      let array = result.data.data;
      let object = {};
      let x;
      for (let i = 0; i < 20; i++) {
        x = array[i].officialId;
        object[x] = false;
     
      }
      let units = object;  

      this.setState({
        data: result.data.data,
        total_pages: Math.ceil(result.data.totalRecords / 20),
        units
      });

      console.log("Result of unit is:", result);
    } else if (this.state.currentActive === "users") {
      let result = await getUserList(
        true,
        this.state.current_page,
        this.state.search,
        this.state.token
      );

      let array = result.data.data;
      let object = {};
      let x;
      for (let i = 0; i < 20; i++) {
        x = array[i].firstName;
        object[x] = false;

      }
      let users = object;


      this.setState({
        data: result.data.data,
        imagePath: result.data.imagePath,
        total_pages: Math.ceil(result.data.totalRecords / 20),
        users
      });

      console.log("Result is :", result);
    }
  }

  async paginationHandler(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  toggleRow(x) {
    if (this.state.currentActive === "units")
    {
      console.log("Trying to check official ID:", x);

      let units = { ...this.state.units };
      let m = !this.state.units[x];
      units[x] = m;
      let last_selected_unit = m === true ? x : "";
      this.setState({
        units,
        last_selected_unit
      });
    }
    else {
      console.log("Trying to check Full Name:", x);

      let users = { ...this.state.users };
      let m = !this.state.users[x];
      users[x] = m;
      let last_selected_user = m === true ? x : "";
      this.setState({
        users,
        last_selected_user
      });
      
    }
    
  }

  render() {
    let column1 = [
      {
        id: "checkbox",
        accessor: "",
        Cell: row => {
          return (
            <input
              type="checkbox"
              checked={this.state.units[row.original.officialId]}
              onChange={() => this.toggleRow(row.original.officialId)}
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
        Cell: row => {
          console.log("row is :", row);
          return (
            <input
              type="checkbox"
              checked={this.state.users[row.original.firstName]}
              onChange={() => this.toggleRow(row.original.firstName)}
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
      }
    ];

    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <h4>Add New Family</h4>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Select the unit</Label>
                <Row>
                  <Col>
                    <Input type="text" value={this.state.last_selected_unit} disabled={true}/>{" "}
                  </Col>
                  <Col>
                    <Button value="units" onClick={e => this.toggleModal(e)}>
                      Select
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Select The Users</Label>
                <Row>
                  <Col>
                    <Input type="text" value={this.state.last_selected_user} disabled={true}/>{" "}
                  </Col>
                  <Col>
                    <Button value="users" onClick={e => this.toggleModal(e)}>
                      Select
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>
                  Add the Name of the New Family (Optional)
                </Label>
                <Input type="text" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success">Submit</Button>
            <Button color="danger" onClick={this.props.toggle}>
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
            <Button color="success" onClick={() => this.toggleModal("units")}>
              Submit
            </Button>
            <Button color="danger" onClick={() => this.toggleModal("units")}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
