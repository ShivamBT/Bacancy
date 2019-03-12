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
import { logIn } from "./components/ApiCalls/ApiCalls";

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
    let result = await logIn(this.state.email, this.state.password);
    console.log("Result is : ", result);
    if (result.data.status === true) {
      await this.setState({
        status: result.data.status,
        token: result.data.token,
        img: result.data.data.picture
      });

      localStorage.setItem("token", this.state.token);
      this.props.history.push(`/dashboard`);
    }
  }

  async componentDidMount() {
    let x = localStorage.getItem("token");
    if (x !== null)
      this.props.history.push("/dashboard");
    console.log("x is :", x);
  }

  render() {
    return (
      <div className="App">
        <h1 className="h1">
          <center>La Cadenelle</center>
        </h1>

        <Container className="container" fluid>
          <Form className="form">
            <h2 className="h2">Login</h2>

            <FormGroup>
              <Label>Email: </Label>
              <div className="input">
                <Input
                  type="email"
                  name="email"
                  onChange={e => this.changeValue(e)}
                  className="input"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Password: </Label>
              <div className="input">
                <Input
                  type="password"
                  name="password"
                  onChange={e => this.changeValue(e)}
                  className="input"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Button
                color="info"
                onClick={this.submitValue}
                className="loginButton">
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
