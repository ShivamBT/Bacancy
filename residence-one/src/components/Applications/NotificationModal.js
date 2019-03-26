import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import "./NotificationModal.css";
import { FaCreativeCommonsPd } from "react-icons/fa";

export class NotificationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      index: null,
      date: "",
      time: ""
    };
  }
  async componentDidMount() {
    let data = this.props.data;
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props)
        await this.setState({ data: this.props.data, index:this.props.index });
    console.log(this.state.data);
    console.log("Index is :", this.props.index);

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
                <p>Hello you have received packet.The packet is a</p>
              </div>
              <div className="middleModal">
                <p>
                  The packet has been received on {this.state.date} at{" "}
                  {this.state.time} Please present this notification to
                  reception and the guard will gladly retrieve your packet for
                  you. A signature will be required.
                </p>
              </div>
              <div className="lowerModal">
                <Row>
                  <Col md="3">
                    <img src="" />
                  </Col>
                  <Col>
                    <p>
                      <br />
                      This code will be scanned by the guard upon retrieval of
                      your packet.
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
