import React, { Component } from "react";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { findUser, createUser, updateUser } from ".././ApiCalls/ApiCall";
import { Badge3, Badge4 } from ".././UI Components/UIComponent";
import "./EditUser.css";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        fname: "",
        lname: "",
        email: "",
        age: "",
        mobile: ""
      },
      userID: "",
      status: true,
      statusCode: ""
    };

    this.changeValue = this.changeValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
    this.editUser = this.editUser.bind(this);
    this.cancelEvent = this.cancelEvent.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.flag === "1") {
      findUser(this.props.match.params.id).then(res => {
        if (res.data.data === null) {
          this.props.history.push("/notfound");
          return;
        }
        console.log("Edit Result is : ", res.data.data);
        this.setState({
          payload: res.data.data,
          userID: res.data.data.id
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let payload = { ...this.state.payload };
      payload = {
        fname: "",
        lname: "",
        email: "",
        age: "",
        mobile: ""
      };
      let userID = "";
      let valid = true;
      let status = true;
      let statusCode = "";
      this.setState({ payload, userID, valid, status, statusCode });
    }
  }

  

  changeValue(e) {
    if (e.target.name === "userID") {
      let userID = e.target.value;
      this.setState({ userID });
    } else {
      let payload = { ...this.state.payload };
      payload[e.target.name] = e.target.value;
      this.setState({ payload });
    }
  }

  submitValue() {
    let payload = { ...this.state.payload };
    createUser(payload)
      .then(res => {
        console.log("Created User is :", res);
        this.props.history.push(`/`);
      })
      .catch(res => {
        console.log("Error Status is :", res);
        this.setState({
          status: res.response.data.status,
          statusCode: res.response.status
        });
      });
  }

  editUser() {
    updateUser(this.state.userID, this.state.payload)
      .then(res => {
        console.log("Updated User is :", res);
        this.props.history.push(`/`);
      })
      .catch(async res => {
        console.log("Error status is :", res);
        await this.setState({
          result: res,
          status: res.response.data.status,
          statusCode: res.response.status
        });
      });
  }

  cancelEvent() {
    this.setState({ valid: true });
    this.props.history.push("/");
  }

  render() {
    let payload = this.state.payload;
    return (
      <div className="form">
        <Form>
          <h2>
            {this.props.match.params.flag === "1" ? <Badge3 /> : <Badge4 />}
          </h2>
          <h3>
            <div>
              {this.state.status ? null : (
                <h4>
                  <div style={{ color: "red" }}>Error!! Request Failed</div>
                </h4>
              )}
            </div>
          </h3>

          <FormGroup>
            <Label>First Name:</Label>
            <input
              type="text"
              name="fname"
              value={payload.fname}
              onChange={e => this.changeValue(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <input
              type="text"
              name="lname"
              value={payload.lname}
              onChange={e => this.changeValue(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <input
              type="email"
              name="email"
              value={payload.email}
              onChange={e => this.changeValue(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Mobile:</Label>
            <input
              type="number"
              name="mobile"
              value={payload.mobile}
              onChange={e => this.changeValue(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Age:</Label>
            <input
              type="number"
              name="age"
              value={payload.age}
              onChange={e => this.changeValue(e)}
            />
          </FormGroup>
          <div>
            {this.props.match.params.flag === "1" ? (
              <Button color="dark" onClick={this.editUser}>
                Update User
              </Button>
            ) : (
              <Button color="primary" onClick={this.submitValue}>
                Create User
              </Button>
              )}
            
            <Button color="secondary" onClick={this.cancelEvent} className="cancelButton">
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default EditUser;
