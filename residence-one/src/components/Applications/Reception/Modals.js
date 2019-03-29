import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";
import "./Modals.css";
import SignatureCanvas from "react-signature-canvas";
import { recoverPacket } from "../../ApiCalls/ApiCalls";

export class ModalPacket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      imagePath: "http://localhost:8080/images/lacadenelle13008fr/users/",
      picture: "abc.jpeg",
      data: "",
      noteAfterRecovery: "",
      invalid: false
    };
    this.clickPad = this.clickPad.bind(this);
    this.submitValue = this.submitValue.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  clickPad() {
    this.sigPad.clear();
  }

  changeValue(value) {
    this.setState({ noteAfterRecovery: value });
  }

  async submitValue() {
    await this.setState({ data: this.sigPad.toDataURL("image/png") });
    let object = {
      dateTimeRecovered: new Date(),
      id: this.props.original.id,
      noteAfterRecovery: this.state.noteAfterRecovery,
      recoveredById: this.props.original.packetType,
      recoveredBySign: this.state.data
    };

    let invalid = this.sigPad.isEmpty();
    let result;
    if (invalid !== true) {
      result = await recoverPacket(object, this.state.token);
    }

    this.setState({ invalid });
    console.log("Result of recover packet is : ", result);
  }

  async componentDidMount() {
    console.log("Did mount called");
    await this.setState({ token: localStorage.getItem("token") });
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          <div>
            <p>Packet Recovery</p>
          </div>
        </ModalHeader>
        <ModalBody className="modalBody">
          <div>
            <p style={{ fontSize: "30px" }}> Packet Number</p>
            <p className="modalNumber">{this.props.original.tempIdNumber}</p>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Packet Type</p>
            <p style={{ fontSize: "20px" }}>
              {this.props.original.packet_type === null
                ? "No type found"
                : `${this.props.original.packet_type.name}`}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Number of Packets</p>
            <p style={{ fontSize: "20px" }}>
              {this.props.original.numberOfItems}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Recipient</p>
            <img src={`${this.state.imagePath}${this.state.picture}`} />
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Signature</p>
            <SignatureCanvas
              penColor="green"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas"
              }}
              ref={ref => {
                this.sigPad = ref;
              }}
            />
            {this.state.invalid === true ? (
              <div style={{ color: "red" }}>
                <p>Please provide the signature before submission</p>
              </div>
            ) : null}
            <Button color="danger" onClick={this.clickPad}>
              Clear
            </Button>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Note after Recovery</p>
            <textarea
              rows="5"
              cols="40"
              onChange={e => this.changeValue(e.target.value)}
            />
          </div>
          <div>
            <Button color="success" onClick={this.submitValue}>
              Packet Recovered
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

ModalPacket.defaultProps = {
  original: {
    tempIdNumber: "Temp 1",
    packet_type: {
      name: "No type found"
    },
    numberOfItems: "1"
  }
};
