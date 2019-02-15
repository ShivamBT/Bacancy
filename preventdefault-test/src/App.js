import React, {Component} from "react";
import {InputComponent} from "./Components/Input Component/InputComponent";
import {Textarea} from "./Components/TextArea/Textarea";
import "./App.css";
import {Button} from "reactstrap";
import {Form,FormGroup,Label,Container,Row,Col,FormText} from "reactstrap";
import {Badge1,Badge2,Badge3,Badge4,Badge5} from "./Components/UI Components/Badges";
import {Radio} from "./Components/Radio/Radio";
import { Checkbox } from "./Components/Checkbox/Checkbox";
import { Password } from "./Components/Password/Password";
import { submitValidation, userCheck,getValidation ,validMain, fieldValidation} from "./Components/Validation/Validation";



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { //Data Object is used to store data temporarily
        name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        gender: "",
        address: "",
        like: [],
      },
      valid:{
        name: true,
        email: true,
        phone_number:true,
        password: true,
        confirm_password: true,
        gender:true,
        field: true,
        userCheck:true
      },
      signup: [], //Signup array Stores Single User Data in each of its element
     
      checkbox_value:[{ id: "1", label: "I Like ReactJs" ,name:"like"},
        { id: "2", label: "I Like AngularJs" ,name:"like"},
        {id: "3",label: "I Like VueJS",name:"like"}],
      
      radio_value: [{ id: "4", label: "Male", name: "gender" },
      { id: "5", label: "Female", name: "gender" }]
    }

    this.changeValue = this.changeValue.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.submitValue = this.submitValue.bind(this);
    this.validChangeState = this.validChangeState.bind(this);
  }

  changeValue(e) {
    let data = {...this.state.data};
    data[e.target.name] = e.target.value;
    this.setState({ data });
    if (e.target.name ==="gender")
    {
      let valid = { ...this.state.valid };
      valid[e.target.name] = true;
      this.setState({ valid });
    }
  }

  changeCheckbox(e) {
    let data = {...this.state.data};
    data[e.target.name] = [...this.state.data.like, e.target.value];
    this.setState({data});
  }

  async submitValue(e) {
    let data = { ...this.state.data };
    let valid = { ...this.state.valid };
    valid=Object.assign(...Object.keys(valid).map(k => ({[k]: false})));
    this.setState({ valid });
    valid = await fieldValidation(data,valid);
    this.setState({ valid });
    let y = userCheck(data, this.state.signup);
    if (this.state.valid.field && y){
      await this.setState({
        signup: [...this.state.signup, this.state.data]
      });
      console.log("Value Submitted: ", this.state)
      alert("User registed Successfully !!");
    }
  }


  validChangeState = (name,value) =>
  {
    
    let valid = { ...this.state.valid };
    valid[name] = false;
    this.setState({ valid });
    let x = validMain(name, value, valid, this.state.data);
    valid[name] = x;
    this.setState({ valid });
  }
  
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
              <Col md={{ offset: 2 }} >
                <h5 >
                  {this.state.valid.field ? null : < Badge4 />}
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
                          valid={this.state.valid.name}
                          onBlur={e => this.validChangeState(e.target.name,e.target.value)}
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
                          valid={this.state.valid.email}
                          onBlur={e => this.validChangeState(e.target.name,e.target.value)}
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
                          valid={this.state.valid.phone_number}
                          onBlur={e => this.validChangeState(e.target.name,e.target.value)}
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
                          value={this.state.data.password}
                          valid={this.state.valid.password}
                          onChange={e => this.changeValue(e)}
                          onBlur={e => this.validChangeState(e.target.name,e.target.value)}
                        />
                      </Label>
                      <FormText >
                        Enter a password with alphabets, number and special characters
                      </FormText>
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
                          value={this.state.data.confirm_password}
                          valid={this.state.valid.confirm_password}
                          onChange={e => this.changeValue(e)}
                          onBlur={e => this.validChangeState(e.target.name,e.target.value)}
                        />
                      </Label>
                      <FormText >
                        Password should match above password
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form >
                  <legend className="genderlegend" >
                    <Badge2 />
                    <h6 >
                      <FormText>
                        Please select one of the genders.It 's not optional
                      </FormText>
                    </h6>
                  </legend>
                  
                  <div className="genderspace">
                    <Radio
                      array={this.state.radio_value}
                      valid={this.state.valid.gender}
                      onChange={e => this.changeValue(e)}
                    />
                  </div>
                  
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
                      onChange={e => this.changeCheckbox(e)}
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