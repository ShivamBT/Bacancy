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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";

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
      index:0
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
      recipientId: this.state.data[index].id,
      recipientFamilyId: this.state.data[index].familyId,
      dateTimeReceived: Date(),
      receivedById: this.state.data[index].updatedBy,
      packetTypeLabel: this.state.selected_type.label,
      packetType: this.state.data[index].updatedBy,
      numberOfItems: this.state.numberOfSelected_type.label,
      tempIdNumber: this.state.currentPacketNo,
      telephone: this.state.data[index].telephone,
      email: this.state.data[index].email,
      currentHost: "localhost",
      fullName: this.state.data[index].fullName,
      emailPref: null,
      smsPref: null
    };
    let result = await addPacket(object, this.state.token);
    console.log("Send Notification Result is : ", result);
    this.setState({ modal: false });
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
          //console.log("row is :", row);
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
        <div className="receptionList">
          <h1 className="receptionHeading">Reception</h1>
          <ReactTable
            data={this.state.data}
            columns={columns}
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
