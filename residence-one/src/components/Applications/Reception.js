import React, { Component } from "react";
import {
  getReceptionList,
  getLastPacket,
  getPacketTypes,
  addPacket
} from "../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import "./Reception.css";
import { Button } from "reactstrap";
import { FaMobileAlt, FaEnvelope, FaBirthdayCake } from "react-icons/fa";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import Select from "react-select";
import { ModalPacket } from "./Modals";

export class Reception extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      current_page: 1,
      total_pages: "",
      search: {
        id: "",
        value: ""
      },
      imagePath: "",
      lastPackerNumber: "",
      currentPacketNo: "",
      formattedDate: "",
      packet_types: [],
      selected_type: null,
      numberOfSelected_type: null,
      modal: false,
      modalPacket: false,
      index: 0,
      original: {
        tempIdNumber: "Temp 1",
        packet_type: {
          name: "No type found"
        },
        numberOfItems: "1",
        user: {
          picture: "abc.jpg"
        }
      },
      activeStatus: {
        reception: true,
        packet_in: false,
        packet_out: false
      },
      currentActive: "reception"
    };
    this.numberOfPackets = [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
      { label: "8", value: "8" },
      { label: "9", value: "9" },
      { label: "10", value: "10" }
    ];

    this.fetchData = this.fetchData.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.changePacketNumber = this.changePacketNumber.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.toggleNew = this.toggleNew.bind(this);
  }
  toggleNew(original) {
    this.setState({ original, modalPacket: !this.state.modalPacket });
  }

  async clickHandler(e) {
    let activeStatus = { ...this.state.activeStatus };
    activeStatus[e.target.name] = true;
    for (let x in activeStatus) {
      if (x !== e.target.name) {
        activeStatus[x] = false;
      }
    }
    await this.setState({ activeStatus, currentActive: e.target.name });
    this.fetchData();
  }

  handleChange(value) {
    this.setState({ numberOfSelected_type: value });
  }
  handleChange2(value) {
    this.setState({ selected_type: value });
  }

  async toggle(index) {
    this.setState({ index: index });
    let result = await getPacketTypes(this.state.token);
    console.log("result of packet types is :", result);
    let packet_types = [];
    for (let i = 0; i < result.data.data.length; i++) {
      packet_types[i] = {
        label: `${result.data.data[i].name}`,
        value: `${result.data.data[i].id}`
      };
      console.log("Packet Types currently is : ", packet_types);
    }

    this.setState({ packet_types });
    this.setState({ modal: !this.state.modal });
    this.changePacketNumber();
  }

  async sendNotification() {
    let index = this.state.index;
    let object = {
      noteByGuard: null,
      recipientId: this.state.data[index].id,
      recipientFamilyId: this.state.data[index].familyId,
      dateTimeReceived: Date(),
      receivedById: this.state.data[index].updatedBy,
      packetTypeLabel: this.state.selected_type.label,
      packetType: this.state.selected_type.label,
      numberOfItems: this.state.numberOfSelected_type.label,
      tempIdNumber: this.state.currentPacketNo,
      telephone: this.state.data[index].telephone,
      email: this.state.data[index].email,
      currentHost: "localhost:3000",
      fullName: this.state.data[index].fullName,
      emailPref: null,
      smsPref: null,
      langPref: null
    };
    let result = await addPacket(object, this.state.token);
    console.log("Send Notification Result is : ", result);
    await this.setState({ modal: false });
  }

  changePacketNumber() {
    let i = this.state.lastPackerNumber.indexOf("-");
    console.log("index :", i);
    let number = `${Number(this.state.lastPackerNumber.substring(i + 1)) + 1}`;
    let string = number.padStart(4, "0");
    let finalString = "P" + `${this.state.formattedDate}` + "-" + `${string}`;
    console.log("Final String is : ", finalString);
    this.setState({ currentPacketNo: finalString });
  }

  formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log("");
    return [year, month, day].join("");
  }

  async paginationHandler(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
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

  async fetchData() {
    let result = await getReceptionList(
      this.state.current_page,
      this.state.search,
      this.state.currentActive,
      this.state.token
    );

    let lastPacket = await getLastPacket(this.state.token);
    console.log("Result of Reception is:", result);
    console.log("Last Packet :", lastPacket);
    this.setState({
      data: result.data.data,
      imagePath: result.data.imagePath,
      total_pages: Math.ceil(result.data.totalRecords / 20),
      lastPackerNumber: lastPacket.data.data.maxTempIdNumber
    });
  }

  async componentDidMount() {
    await this.setState({ token: localStorage.getItem("token") });
    this.fetchData();
    let date = Date();
    await this.setState({ formattedDate: this.formatDate() });
    console.log("dat is :", this.formatDate());
    this.fetchData();
  }

  render() {
    let columns = [
      {
        id: "name",
        Header: "Name",
        accessor: "fullName"
      },
      {
        Header: "Profile Picture",
        accessor: "picture",
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
        Header: "Main Unit Id",
        accessor: "family.families_units[0].unit.officialId"
      },

      {
        Header: "Building",
        accessor: "family.families_units[0].unit.building.name"
      },
      {
        Header: "Telephone",
        accessor: "telephone"
      },

      {
        Header: "",
        Cell: row => {
          return (
            <div>
              <Button color="success" onClick={() => this.toggle(row.index)}>
                Receive
              </Button>
            </div>
          );
        }
      },
      {
        Header: "Complete",
        Cell: row => {
          return (
            <div key={row.index}>
              {row.original.telephone ? null : (
                <span className="icon">
                  <FaMobileAlt />
                </span>
              )}
              {row.original.email ? null : (
                <span className="icon">
                  <FaEnvelope />
                </span>
              )}
              {row.original.dateOfBirth ? null : (
                <span className="icon">
                  <FaBirthdayCake />
                </span>
              )}
            </div>
          );
        }
      }
    ];

    let columns2 = [
      {
        Header: "Number",
        accessor: "tempIdNumber",
        width: 180
      },
      {
        Header: "Status",
        accessor: "",
        width: 100,
        Cell: row => {
          console.log("status row is :", row);
          let color1 = row.original.smsSent ? "green" : "red";
          let color2 = row.original.emailSent ? "green" : "red";
          return (
            <div>
              <span style={{color:color1}}>
                <FaMobileAlt size={35} />
              </span>
              
              &nbsp;
              <span style={{color:color2}}>
                <FaEnvelope size={35} />
              </span>
              
            </div>
          );
        }
      },
      {
        Header: "Date in",
        accessor: "createdAt",
        Cell: row => {
          let i = row.original.createdAt.indexOf("T");
          let date = row.original.createdAt.substring(0, i);
          return `${date}`;
        },

        width: 100
      },
      {
        Header: "Time in",
        accessor: "createdAt",
        Cell: row => {
          let i = row.original.createdAt.indexOf("T");
          let time = row.original.createdAt.substring(i + 1, i + 6);
          return `${time}`;
        },
        width: 100
      },
      {
        Header: "Name",
        accessor: "user.fullName",
        width: 200
      },
      {
        Header: "Profile Picture",
        accessor: "user.picture",
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
        Header: "Main Unit Id",
        accessor: "user.family.families_units[0].unit.officialId"
      },
      {
        Header: "Building",
        accessor: "user.family.families_units[0].unit.building.name"
      },
      {
        Header: "Action",
        Cell: row => {
          return (
            <Button
              color="success"
              onClick={() => this.toggleNew(row.original)}>
              Receive
            </Button>
          );
        }
      }
    ];

    let columns3 = [
      {
        Header: "Number",
        accessor: "tempIdNumber"
      },
      {
        Header: "Date in",
        accessor: "dateTimeReceived",
        Cell: row => {
          //return "";
          if (
            this.state.data[row.index].dateTimeReceived === null ||
            this.state.data[row.index].dateTimeReceived === undefined
          ) {
            return "";
          } else {
            let i = this.state.data[row.index].dateTimeReceived.indexOf("T");
            let date_in = this.state.data[row.index].dateTimeReceived.substring(
              0,
              i
            );
            return `${date_in}`;
          }
        }
      },
      {
        Header: "Time in",
        accessor: "dateTimeReceived",
          Cell: row => {
            if (this.state.data[row.index].dateTimeReceived === null ||
              this.state.data[row.index].dateTimeReceived === undefined) {
              return "";
            } else {
              let i = this.state.data[row.index].dateTimeReceived.indexOf("T");
              let time_in = this.state.data[row.index].dateTimeReceived.substring(
                i + 1,i+6
              );
              return `${time_in}`;
            }
          }
      },
      {
        Header: "Date out",
        accessor: "dateTimeRecovered",
          Cell: row => {
            if (this.state.data[row.index].dateTimeRecovered === null ||
              this.state.data[row.index].dateTimeRecovered === undefined) {
              return "";
            } else {
              let i = this.state.data[row.index].dateTimeRecovered.indexOf("T");
              let date_out = this.state.data[
                row.index
              ].dateTimeRecovered.substring(0, i);
              return `${date_out}`;
            }
          }
      },
      {
        Header: "Time Out",
        accessor: "dateTimeRecovered",
          Cell: row => {
            if (this.state.data[row.index].dateTimeRecovered === null ||
              this.state.data[row.index].dateTimeRecovered === undefined) {
              return "";
            } else {
              let i = this.state.data[row.index].dateTimeRecovered.indexOf("T");
              let time_out = this.state.data[
                row.index
              ].dateTimeRecovered.substring(i + 1,i+6);
              return `${time_out}`;
            }
          }
      },
      {
        Header: "Main Unit Id",
        accessor: "user.family.families_units[0].unit.officialId"
      }
    ];

    return (
      <div className="reception">
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>

        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Reception and Notification
            </ModalHeader>
            <ModalBody>
              <div className="modalBody">
                <p>Please write this number on packet or print a label</p>
              </div>
              <div className="modalBody" style={{ fontSize: "40px" }}>
                <p>{this.state.currentPacketNo}</p>
              </div>
              <div className="modalBody">
                <p>What type of packet it is?</p>
              </div>
              <div className="modalBody">
                <Select
                  className="modalBody"
                  name="selected_type"
                  value={this.state.selected_type}
                  options={this.state.packet_types}
                  onChange={this.handleChange2}
                />
              </div>
              <br />
              <div className="modalBody">
                <p className="modalBody">
                  More than one Packet for the same person?
                </p>
              </div>

              <div className="modalBody">
                <Select
                  className="modalBody"
                  name="numberOfSelected_type"
                  value={this.state.numberOfSelected_type}
                  options={this.numberOfPackets}
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <div className="modalBody">
                <Button color="primary">Click to take a picture</Button>
              </div>
              <br />
              <div className="modalBody">
                <Button color="secondary">Print a Label</Button>
              </div>
              <br />
              <div className="modalBody">
                <Button color="success" onClick={this.sendNotification}>
                  Send Notification
                </Button>
              </div>
              <br />
            </ModalBody>
          </Modal>
        </div>

        <div>
          <ModalPacket
            isOpen={this.state.modalPacket}
            toggle={() => this.toggleNew()}
            original={this.state.original}
          />
        </div>

        <div className="receptionList">
          <h1 className="receptionHeading">Reception</h1>
          <div class="receptionNavBar">
            <Nav tabs>
              <NavItem>
                <NavLink active={this.state.activeStatus.reception}>
                  <Button
                    color="link"
                    name="reception"
                    value={1}
                    onClick={e => this.clickHandler(e)}>
                    Reception
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={this.state.activeStatus.packet_in}>
                  <Button
                    color="link"
                    name="packet_in"
                    value={2}
                    onClick={e => this.clickHandler(e)}>
                    Packet In
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={this.state.activeStatus.packet_out}>
                  <Button
                    color="link"
                    name="packet_out"
                    value={3}
                    onClick={e => this.clickHandler(e)}>
                    Packet Out
                  </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </div>

          <ReactTable
            data={this.state.data}
            columns={
              this.state.currentActive === "reception"
                ? columns
                : this.state.currentActive === "packet_in"
                ? columns2
                : columns3
            }
            className="receptionList"
            pages={this.state.total_pages}
            page={this.state.current_page - 1}
            manual
            onPageChange={pageIndex => this.paginationHandler(pageIndex)}
            onFilteredChange={this.onFilteredChange}
            onFetchData={this.fetchData}
            noDataText="Please Wait ..."
            sortable={true}
            filterable={true}
          />
        </div>
      </div>
    );
  }
}
