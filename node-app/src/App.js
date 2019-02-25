import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Form, Label, FormGroup, Button, Badge } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_data: [],
      payload: {
        fname: '',
        lname: '',
        email: '',
        age: '',
        mobile: '',
      },
      userID: '',
      userData: [],
      deletedData: []
    }
    this.fetchData = this.fetchData.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
    this.findUser = this.findUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
  }

  fetchData = async () => {
    let result = await axios.get("http://localhost:8080/api/students/list");
    let student_data = result.data.data;
    this.setState({ student_data });
  }

  componentDidUpdate() {
    console.log("Student Data is :", this.state.student_data);
  }

  changeValue(e) {
    if (e.target.name === "userID") {
      let userID = e.target.value;
      this.setState({ userID });
    }
    else {
      let payload = { ...this.state.payload };
      payload[e.target.name] = e.target.value;
      this.setState({ payload });
    }

  }


  submitValue() {
    let payload = { ...this.state.payload };
    payload['Id'] = this.state.userID;
    axios.post("http://localhost:8080/api/students/create",payload)
      .then(res => {
        console.log("Created User is :", res);
      });
    this.fetchData();
  }

  async findUser() {
    let userData = await axios.get(`http://localhost:8080/api/students/find/${this.state.userID}`);
    this.setState({ userData });
  }

  async deleteUser() {
    let deletedData = await axios.delete(`http://localhost:8080/api/students/delete/${this.state.userID}`);
    this.setState({ deletedData });
    this.fetchData();
  }

  UpdateUser()
  {
    axios.put(`http://localhost:8080/api/students/update/${this.state.userID}`, this.state.payload)
      .then(res => {
        console.log("Updated User is :", res);
      });
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <h1>User Interface</h1>
        <p>Student data is :</p>
        <button onClick={this.fetchData}>
          Fetch Data
        </button>
        <div className="data">



          <div className="Table">
            <div className="Title">
              <h2>Student Data</h2>
            </div>

            <div className="Heading">
              <div className="Cell">
                <p>Id</p>
              </div>
              <div className="Cell">
                <p>First_name</p>
              </div>
              <div className="Cell">
                <p>Last_name</p>
              </div>
              <div className="Cell">
                <p>Email</p>
              </div>
              <div className="Cell">
                <p>Mobile_No</p>
              </div>
              <div className="Cell">
                <p>Age</p>
              </div>
            </div>
            {this.state.student_data.map(u => {
              return (
                <div className="Row" key={u.id}>
                  <div className="Cell">
                    <p>{u.id}</p>
                  </div>
                  <div className="Cell">
                    <p>{u.fname}</p>
                  </div>
                  <div className="Cell">
                    <p>{u.lname}</p>
                  </div>
                  <div className="Cell">
                    <p>{u.email}</p>
                  </div>
                  <div className="Cell">
                    <p>{u.mobile}</p>
                  </div>
                  <div className="Cell">
                    <p>{u.age}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Form>
          <h2><Badge color="primary">Create User</Badge></h2>


          <FormGroup>
            <Label>
              Id:
            </Label>
            <input type="number" name="userID" value={this.state.userID} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>First Name:</Label>
            <input type="text" name="fname" value={this.state.payload.first_name} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <input type="text" name="lname" value={this.state.payload.last_name} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <input type="email" name="email" value={this.state.payload.email} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Mobile:</Label>
            <input type="number" name="mobile" value={this.state.payload.mobile} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Age:</Label>
            <input type="number" name="age" value={this.state.payload.age} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <Button color="success" onClick={this.submitValue}>
            Create User
          </Button>

        </Form>
        <div>
          <h2><Badge color="primary">Find User</Badge></h2>
  
          <input type="text" name="userID" value={this.state.userID} onChange={e => this.changeValue(e)} />
          <Button color="success" onClick={this.findUser}>
            Find User
          </Button>
          {console.log("Found user is :" , this.state.userData)}
        </div>

        <div>
          <h2><Badge color="primary">Delete User</Badge></h2>

          <input type="text" name="userID" value={this.state.userID} onChange={e => this.changeValue(e)} />
          <Button color="success" onClick={this.deleteUser}>
            Delete User
          </Button>
          {console.log("Deleted user is :", this.state.deletedData)}
        </div>


        <Form>
          <h2><Badge color="primary">Update User</Badge></h2>

          <FormGroup>
            <Label>
              Id:
            </Label>
            <input type="number" name="userID" value={this.state.userID} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>First Name:</Label>
            <input type="text" name="fname" value={this.state.payload.first_name} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <input type="text" name="lname" value={this.state.payload.last_name} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <input type="email" name="email" value={this.state.payload.email} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Mobile:</Label>
            <input type="number" name="mobile" value={this.state.payload.mobile} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <FormGroup>
            <Label>Age:</Label>
            <input type="number" name="age" value={this.state.payload.age} onChange={e => this.changeValue(e)} />
          </FormGroup>

          <Button color="success" onClick={this.UpdateUser}>
            Update User
          </Button>

        </Form>
      </div>
    );
  }
}

export default App;
