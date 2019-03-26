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

export class EditPageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      date: new Date()
    };
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(value) {
    this.setState({ date: value });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>Edit user Details</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Mobile Number:</Label>
                <span>
                  <Dropdown>
                    <DropdownToggle caret />
                    <Input type="number" name="telephone" />
                  </Dropdown>
                </span>
              </FormGroup>

              <FormGroup>
                <Label>Email Address:</Label>
                <Input type="number" name="telephone" />
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <DatePicker
                  onChange={this.props.onChange}
                  value={this.state.date}
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary">Upload Profille Picture</Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
                    <Button color="success">Submit</Button>
                    &nbsp;
                    <Button color="danger" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
