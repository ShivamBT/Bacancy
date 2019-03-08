import React, { Component } from "react";
import "./App.css";
import {
  Badge,
  Form,
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      status: false,
      token: "",
      image: ""
    };
    this.changeValue = this.changeValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
  }

  changeValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async submitValue(e) {
    let result = await axios.post(`http://localhost:8080/api/user/login`, {
      email: this.state.email,
      password: this.state.password
    });
    console.log("Result is : ", result);
    if (result.data.status === true) {
      await this.setState({
        status: result.data.status,
        token: result.data.token,
        img: result.data.data.picture
      });

      localStorage.setItem("status", this.state.status);
      localStorage.setItem("token", this.state.token);
      this.props.history.push(`/loggedin`);
    }
  }

  async componentDidMount() {
    console.log("Did mount called");
    let x = localStorage.getItem("status");
    console.log("x is: ", x);
    if (x === true) {
      this.props.history.push("/loggedin");
    } else if (x === false) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="h1">
          <Badge color="info">Residence One</Badge>
        </h1>

        <Container>
          <Form className="form">
            <h2 className="h2">
              <Badge color="info">Login</Badge>
            </h2>

            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <h4>
                    <Badge color="info">
                      <Label>Email: </Label>
                    </Badge>
                  </h4>
                </InputGroupAddon>
                <Input
                  type="email"
                  name="email"
                  onChange={e => this.changeValue(e)}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <h4>
                    <Badge color="info">
                      <Label>Password : </Label>
                    </Badge>
                  </h4>
                </InputGroupAddon>
                  <Input
                    type="password"
                    name="password"
                    onChange={e => this.changeValue(e)}
                  />
               
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Button color="info" onClick={this.submitValue} className="loginButton">
                Log in
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;
