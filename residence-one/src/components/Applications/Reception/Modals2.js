import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";
import "./Modals.css";
import SignatureCanvas from "react-signature-canvas";
import { recoverPacket, getReceptionList } from "../../ApiCalls/ApiCalls";

export class PacketRecovered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      imagePath: "http://localhost:8080/images/lacadenelle13008fr/users/",
      picture: "abc.jpeg",
      current_page:1,
      data: [
        {
          recoveredBySign: "",
          tempIdNumber: "0",
          numberOfItems: 0,
          noteAfterRecovery: "Test Note",
          packet_type: null,
          user: {
            fullname: "Test User"
          }
        }
      ],
      index: 0
    };
  }

  async componentDidMount() {
    console.log("Did mount called");
    await this.setState({ token: localStorage.getItem("token"), current_page: this.props.current_page });
    if (this.props.currentActive === "packet_out")
    {
      let result = await getReceptionList(
        this.state.current_page,
        this.state.search,
        "packet_out",
        this.state.token
      );
      await this.setState({ data: result.data.data, index: this.props.index });
      
    }
    

  
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps && this.props.currentActive==="packet_out") {
      let result = await getReceptionList(
        this.props.current_page,
        this.state.search,
        "packet_out",
        this.state.token
      );

      await this.setState({ data: result.data.data, index: this.props.index });
    }
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
            <p className="modalNumber">
              {/* {this.state.data[this.state.index].tempIdNumber} */}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Packet Type</p>
            <p style={{ fontSize: "20px" }}>
              {/* {this.state.data[this.state.index].packet_type === null
                ? "No type found"
                : `${this.state.data[this.state.index].packet_type.name}`} */}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Number of Packets</p>
            <p style={{ fontSize: "20px" }}>
              {/* {this.state.data[this.state.index].numberOfItems} */}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Recipient</p>
            <img src={`${this.state.imagePath}${this.state.picture}`} />
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Signature</p>
            <div style={{border:"1px solid black" , height:"100" , width:"100"}}>
              {/* <img src={this.state.data[this.state.index].recoveredBySign} /> */}
            </div>
            <Button color="danger" disabled>
              Clear
            </Button>
          </div>
          <div>
            <p style={{ fontSize: "30px" }}>Note after Recovery</p>
            <textarea
              rows="5"
              cols="40"
              onChange={e => this.changeValue(e.target.value)}
             // value={this.state.data[this.state.index].noteAfterRecovery}
            />
          </div>
          <div>
            <Button color="success" disabled>
              Packet Recovered
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
