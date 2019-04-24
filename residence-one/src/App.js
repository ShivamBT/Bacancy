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
import { FaLock } from "react-icons/fa";
import { Footer } from "./components/Footer/Footer";
import { Helmet} from "react-helmet";

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
      localStorage.setItem("id", result.data.data.id);
      this.props.history.push(`/dashboard`);
    }
  }

  async componentDidMount() {
    let x = localStorage.getItem("token");
    if (x !== null) this.props.history.push("/dashboard");
    console.log("x is :", x);
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>My Title</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <h1 className="h1" style={{ textAlign: "center" }}>
          <b>la Cadenelle</b>
        </h1>
        <Form className="form">
          <h2 className="h2">
            <FaLock />
            Login
          </h2>

          <FormGroup>
            <Label className="label">Email: </Label>
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
            <Label className="label">Password: </Label>
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
        <Footer />
      </div>
    );
  }
}

export default App;
