import React, {Component} from "react";
import {InputComponent} from "./Components/Input Component/InputComponent";
import {Textarea} from "./Components/TextArea/Textarea";
import "./App.css";
import {Button} from "reactstrap";
import {Form,FormGroup,Label,Container,Row,Col,FormText} from "reactstrap";
import {Badge1,Badge2,Badge3,Badge4,Badge5,Badge6,Badge7,Badge8,Badge9,Badge10} from "./Components/UI Components/Badges";
import {Radio} from "./Components/Radio/Radio";
import { Checkbox } from "./Components/Checkbox/Checkbox";
import { Password } from "./Components/Password/Password";



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { //Data Object is used to store data temporarily
        name: "",
        address: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        gender: "",
        like: [],

      },
      signup: [], //Signup array Stores User Data in each of its element

     
      valid_password: true,
      valid_confirm_password: true,
      valid_password_match: true,
      field: true,
      user_check: true,
      checkbox_value: [{
        id: "1",
        label: "I Like ReactJs"
      }, {
        id: "2",
        label: "I Like AngularJs"
      }, {
        id: "3",
        label: "I Like VueJS"
      }],
      radio_value: [{
        id: "4",
        label: "Male",
        name: "gender"
      }, {
        id: "4",
        label: "Female",
        name: "gender"
      }]
    }

    this.changeValue = this.changeValue.bind(this);
    this.changeValue2 = this.changeValue2.bind(this);
    this.submitValue = this.submitValue.bind(this);
   
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.submitValidation = this.submitValidation.bind(this);
    this.userCheck = this.userCheck.bind(this);

  }







  //Change Value Functions Start here

  changeValue(e) {
    let data = {
      ...this.state.data
    };
    data[e.target.name] = e.target.value;
    this.setState({
      data
    });
  }

  changeValue2(e) {
    let data = {
      ...this.state.data
    };
    data[e.target.name] = [...this.state.data.like, e.target.value];
    this.setState({
      data
    });
  }

  //Change Value Functions end here

  //Submit Function Start
  async submitValue(e) {
    let data = {
      ...this.state.data
    };
    if (this.submitValidation() && this.userCheck(data)) {
      await this.setState({
        signup: [...this.state.signup, this.state.data]
      });
      console.log("Value Submitted: ", this.state)
      alert("User registed Successfully !!");
    }
  }
  //Submit Function end

  //Individual Validation methods start here

  validateName(e) {
    let x = e.target.value;
    this.setState({
      valid_name: false
    });
    let regex = /^[a-zA-Z ]{2,30}$/.test(x);
    this.setState({
      valid_name: regex
    });
    console.log("regex is: ", regex);
  }


  validateEmail(e) {
    let x = e.target.value;
    this.setState({
      valid_email: false
    });
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x);
    this.setState({
      valid_email: regex
    });
    console.log("regex is: ", regex);
  }

  validatePassword(e) {
    let x = e.target.value;
    this.setState({
      valid_password: false
    });
    console.log("Value of password: ", x);
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);
    this.setState({
      valid_password: regex
    });
    console.log("regex is: ", regex);
  }


  validateConfirmPassword(e) {
    let x = e.target.value;
    this.setState({
      valid_confirm_password: false,
      valid_password_match: false
    });
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);
    console.log("Value of password: ", this.state.data.password);
    console.log("Value of confirm password: ", x);

    if (regex && this.state.data.password === this.state.data.confirm_password) {
      this.setState({
        valid_confirm_password: regex,
        valid_password_match: true
      });
    } else if (regex) {
      this.setState({
        valid_confirm_password: regex
      });
    }

  }

  validateNumber(e) {
    let x = e.target.value;
    this.setState({
      valid_phone_number: false
    });
    let regex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(x);
    this.setState({
      valid_phone_number: regex
    });
    console.log("regex is: ", regex);
  }


  submitValidation() {
    console.log("Submit Validation called");
    this.setState({
      field: false
    });
    if (this.state.data.name === '') {
      console.log("If called");
      this.setState({
        field: false
      });
      return false;
    } else if (this.state.data.email === '') {
      console.log("If called");
      this.setState({
        field: false
      });
      return false;
    } else if (this.state.data.password === '') {
      console.log("If called");
      this.setState({
        field: false
      });
      return false;
    } else if (this.state.data.confirm_password === '') {
      console.log("If called");
      this.setState({
        field: false
      });
      return false;
    } else if (this.state.data.phone_number === '') {
      console.log("If called");
      this.setState({
        field: false
      });
      return false;
    } else if (this.state.data.gender === '') {
      console.log("If called");
      this.setState({
        field: false
      });
      return false;
    } else {
      console.log("else called");
      this.setState({
        field: true
      });
      return true;
    }
  }

  userCheck(data) {
    for (let i = 0; i < this.state.signup.length; i++) {
      if (data.email === this.state.signup[i].email) {
        alert("This user is already registered");
        console.log("User already registered");
        return false;
      }
    }
    return true;
  }

  //Individual Validation Methods end here




  //Render Function starts from here

  render() {
    return (
      <div className="App" >
        <Container>
          <div className="inner" >
            <h1 className="h1" >
              <Badge1 />
            </h1>
            <br />
            
            <Row >
              <Col md={{ offset: 1 }} >
                <h5 >
                  {this.state.field ? null : < Badge4 />}
                </h5> 
                <br />
              </Col>
            </Row>
            
            <Form >
              <FormGroup tag="fieldset" >
                <Row form className="row" >
                  <Col >
                    <FormGroup >
                      <Label >
                        <InputComponent
                          label="Name"
                          placeholder="Shivam"
                          type="text"
                          name="name"
                          value={this.state.data.name}
                          onChange={e => this.changeValue(e)}
                        />
                      </Label>
                      <FormText >
                        Enter both your First Name and Last name here with a space
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form className="row" >
                  <Col >
                    <FormGroup >
                      <Label >
                        <InputComponent
                          label="E-mail"
                          placeholder="john@example.com"
                          type="email"
                          name="email"
                          value={this.state.data.email}
                          onChange={e => this.changeValue(e)}
                        />
                      </Label>
                      <FormText >
                        Enter a valid E-mail here
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form className="row" >
                  <Col >
                    <FormGroup >
                      <Label >
                        <InputComponent
                          label="Phone Number"
                          placeholder="7895689987"
                          type="number"
                          name="phone_number"
                          value={this.state.data.phone_number}
                          onChange={e => this.changeValue(e)}
                        />
                      </Label>
                      <FormText >
                        Enter a valid Phone Number here.
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>
                
                <Row form className="row" >
                  <Col >
                    <FormGroup >
                      <Label >
                        <Password
                          label="Password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={e => this.changeValue(e)}
                          onBlur={e => this.validatePassword(e)}
                        />
                      </Label>
                      <FormText >
                        Enter a password with alphabets, number and special characters
                      </FormText>
                      {this.state.valid_password ? null : < Badge7 / >} 
                    </FormGroup>
                  </Col>
                </Row>

                <Row form className="row" >
                  <Col >
                    <FormGroup >
                      <Label >
                        <Password
                          label="Confirm Password"
                          type="password"
                          name="confirm_password"
                          value={this.state.password}
                          onChange={e => this.changeValue(e)}
                          onBlur={e => this.validatePassword(e)}
                        />
                      </Label>
                      <FormText >
                        Enter a password with alphabets, number and special characters
                      </FormText>
                      {this.state.valid_password ? null : < Badge7 / >} 
                    </FormGroup>
                  </Col>
                </Row>
                
                <Row form className="row" >
                  <Col >
                    <FormGroup >
                      <Label >
                        <Textarea label="Address"
                          type="textarea"
                          name="address"
                          onChange={e => this.changeValue(e)}
                        />
                      </Label>
                      <FormText>
                        Enter your Permanent Living Address here
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>
                
                
                <Row form >
                  <legend className="genderlegend" >
                    <Badge2 />
                    <h6 >
                      <FormText >
                        Please select one of the genders.It 's not optional
                      </FormText>
                    </h6>
                  </legend>
                  
                  <div >
                    <Radio
                      array={this.state.radio_value}
                      onChange={e => this.changeValue(e)}
                    />
                  </div>
                </Row>
                
                <Row >
                  <legend className="legend" >
                    <Badge3 />
                    <h6 >
                      <FormText >
                        Please select one of the Likes.It 's optional
                      </FormText>
                    </h6>
                  </legend>
                  
                  <div >
                    <Checkbox
                      array={this.state.checkbox_value}
                      onChange={e => this.changeValue2(e)}
                    />
                  </div>
                </Row>
                
                <Row form >
                  <Col xs={{ size: 'auto', offset: 3 }} >
                    <Button
                      color="primary"
                      name="signup"
                      className="button"
                      onClick={e => this.submitValue(e)}>
                      SignUp
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;