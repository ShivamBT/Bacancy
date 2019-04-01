import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import "./NotificationModal.css";
import { getReceptionList } from "../../ApiCalls/ApiCalls";
import SignatureCanvas from "react-signature-canvas";

export class NotificationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          QRCode:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAAklEQVR4AewaftIAAAeISURBVO3BQY4kRxLAQDLQ//8yd45+SiBR1SMp1s3sD9a6xGGtixzWushhrYsc1rrIYa2LHNa6yGGtixzWushhrYsc1rrIYa2LHNa6yGGtixzWushhrYv88CGVv6niDZWpYlKZKiaVqWJSmSo+oTJV/CaVqWJS+ZsqPnFY6yKHtS5yWOsiP3xZxTepvKHyCZVvUpkqJpU3VJ5UPFGZKt6o+CaVbzqsdZHDWhc5rHWRH36ZyhsVb6hMFZPKk4pJZaqYVN6oeFIxqbxR8UTlicpU8YbKGxW/6bDWRQ5rXeSw1kV+uIzKVDGpPKmYVJ5UTCpTxRsVk8obKm9U3OSw1kUOa13ksNZFfricylQxqUwqU8UnVP6mikllqphUpor/ssNaFzmsdZHDWhf54ZdV/JMqJpWp4o...",
          numberOfItems: 0,
          packet_type: null,
          tempIdNumber: 0,
          user: {
            fullName: "Test User"
          }
        }
      ],
      index: 0,
      date: "",
      time: "",
      search: {
        id: "",
        value: ""
      }
    };
  }
  async componentDidMount() {
    if (this.props.currentActive === "packet_in") {
      console.log("Did mount called");
      let result = await getReceptionList(
        this.props.current_page,
        this.state.search,
        "packet_in",
        localStorage.getItem("token")
      );

      await this.setState({ data: result.data.data, index: this.props.index });

      let i = this.state.data[this.state.index].dateTimeReceived.indexOf("T");
      let date = this.state.data[this.state.index].dateTimeReceived.substring(
        0,
        i
      );
      let time = this.state.data[this.state.index].dateTimeReceived.substring(
        i + 1,
        i + 6
      );
      this.setState({ date, time });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log("Did before if called");
    if (prevProps !== this.props && this.props.currentActive==="packet_in") {
      console.log("Did update in the if called");
      let result = await getReceptionList(
        this.props.current_page,
        this.state.search,
        "packet_in",
        localStorage.getItem("token")
      );

      await this.setState({ data: result.data.data, index: this.props.index });
      console.log("Index is :", this.state.index);

      let i = this.state.data[this.state.index].dateTimeReceived.indexOf("T");
      let date = this.state.data[this.state.index].dateTimeReceived.substring(
        0,
        i
      );
      let time = this.state.data[this.state.index].dateTimeReceived.substring(
        i + 1,
        i + 6
      );
      this.setState({ date, time });
    } else {
      console.log("Did update in else called");
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <p>Sent Notification</p>
          </ModalHeader>
          <ModalBody>
            <div className="mainModal">
              <div className="upperModal">
                <p>
                  Hello {this.state.data[this.state.index].user.fullName} .
                  <br />
                  You have received{" "}
                  {this.state.data[this.state.index].numberOfItems} packets.
                  <br />
                  The packet is a{" "}
                  {this.state.data[this.state.index].packet_type === null ||
                  this.state.data[this.state.index].packet_type.name ===
                    undefined
                    ? "Not Available"
                    : this.state.data[this.state.index].packet_type.name}
                </p>
              </div>
              <div className="middleModal">
                <p>
                  <b>
                    The packet has been received on {this.state.date} at{" "}
                    {this.state.time}.
                  </b>
                  <br />
                  <br />
                  Please present this notification to reception and the guard
                  will gladly retrieve your packet for you. A signature will be
                  required.
                </p>
              </div>
              <div className="lowerModal">
                <Row>
                  <Col md="3">
                    <img src={this.state.data[this.state.index].QRCode} />
                  </Col>
                  <Col>
                    <p
                      style={{
                        color: "black",
                        marginLeft: "10px",
                        textAlign: "right"
                      }}>
                      <b>{this.state.data[this.state.index].tempIdNumber}</b>
                      <br />
                      This code will be scanned by
                      <br /> the guard upon retrieval of your packet.
                    </p>
                  </Col>
                </Row>
              </div>
              <div />
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
