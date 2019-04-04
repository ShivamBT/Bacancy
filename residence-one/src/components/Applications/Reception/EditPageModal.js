import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,  
  Label,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button
} from "reactstrap";
import { Flag } from "react-flagkit";
import DatePicker from "react-date-picker";
import { editUserDetails } from ".././.././ApiCalls/ApiCalls";

export class EditPageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:'',
      date: new Date(),
      mobile: "",
      email: ""
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
  }

  changeDate(value) {
    this.setState({ date: value });
  }

  changeValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem("token") });
  }

  async submitValue() {
    let object = {
      emailData: this.state.email,
      telephoneData: this.state.mobile,
      dateOfBirthData: this.state.date
    };
    let result = await editUserDetails(this.props.id, object, this.state.token);
    console.log("Result of submission of edit user is : ", result);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            Edit user Details
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Mobile Number:</Label>
                {/* <span>
                  <Dropdown>
                    <DropdownToggle caret />
                  </Dropdown>
                </span> */}
                <span>
                  <Input
                    type="number"
                    name="mobile"
                    onChange={e => this.changeValue(e)}
                  />
                </span>
              </FormGroup>

              <FormGroup>
                <Label>Email Address:</Label>
                <Input type="email" name="email" onChange={e => this.changeValue(e)} />
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <DatePicker
                  onChange={this.changeDate}
                  value={this.state.date}
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary">Upload Profille Picture</Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.submitValue}>
              Submit
            </Button>
            &nbsp;
            <Button color="danger" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
