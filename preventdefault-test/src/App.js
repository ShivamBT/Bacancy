import React, { Component } from "react";
import { InputComponent } from "./Components/InputComponent";
import { Textarea } from "./Components/Textarea";

import "./App.css";
import { Button } from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";

const pstyle={
  color: 'blue',
  textAlign: 'center'
}





export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
      name: "",
      address: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      gender: "",
      like: [],
      valid_name: false,
      valid_email:false,
      valid_password:false,
      valid_number:false

    },
      signup:[]

    }

    this.changeValue=this.changeValue.bind(this);
    this.changeValue2=this.changeValue2.bind(this);
    this.submitValue=this.submitValue.bind(this);
    this.validateName=this.validateName.bind(this);
    this.validateEmail=this.validateEmail.bind(this);
    this.validatePassword=this.validatePassword.bind(this);
    this.validateNUmber=this.validateNUmber.bind(this);
  }


  changeValue(e)
  {
  
    let data={...this.state.data};

    data[e.target.name]=e.target.value;
    
   
    

    this.setState({data});
  }


  changeValue2(e)
  {
  

    let data={...this.state.data};
  
    
    data[e.target.name]=[...this.state.data.like,e.target.value];

    
    this.setState({data});
  }


  

  async submitValue(e)
  {

   

 // let signup=[...this.state.signup,{...this.state.data}];
  
     await this.setState({signup : [...this.state.signup,this.state.data]});

    console.log("Value Submitted: " , this.state)
     
  }

  

  /*validateName()
  {

  }*/

 

  render() {
    return (
      <div className="App">
        <h1 style={pstyle}>Registration Form</h1>
        
       
          <FormGroup>
              <Label>
              <InputComponent label="Name "   type="text" name="name" onChange={e => this.changeValue(e)}/>
              </Label>
              
          
          </FormGroup>

          


          <FormGroup>
              <Label>
              <Textarea label="Address"  type="textarea" name="address" onChange={e => this.changeValue(e)}/>
              </Label>
              
          
          </FormGroup>


       
          <FormGroup>
            <Label>
            <InputComponent   label="E-Mail" type="email" name="email" onChange={e => this.changeValue(e)} onBlur/>
            </Label>
              
           
          </FormGroup>

          <FormGroup>
                <Label>
                <InputComponent
                
                label="Phone Number"
                type="number"
                name="phone_number"

                onChange={e => this.changeValue(e)}/>
                </Label>
              
          
          </FormGroup>


          <FormGroup>
              <Label>

              <InputComponent
                
                label="Password"
                type="password"
                name="password"

                onChange={e => this.changeValue(e)}
              />
              </Label>
              
          
          </FormGroup>

          <FormGroup>
              <Label>

              <InputComponent

                label="Confirm Password"
                type="password"
                name="confirm_password"

                onChange={e => this.changeValue(e)}
              />
              </Label>
              
           
          </FormGroup>

          

          <FormGroup tag="fieldset">
            <legend>Gender</legend>
            <FormGroup check>
              <Label>
                <InputComponent

                  
                  label="Male"
                  type="radio"
                  name="gender"
                  value="male"

                  onChange={e => this.changeValue(e)}
                />
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label>
                <InputComponent

                  
                  label="Female"
                  type="radio"
                  name="gender"
                  value="female"

                  onChange={e => this.changeValue(e)}
                />
              </Label>
            </FormGroup>
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Likes</legend>

            <FormGroup check>
              <Label>
                <InputComponent

                  
                  label="I Like ReactJS"
                  type="checkbox"
                  name="like"
                  value="reactjs"

                  onChange={e => this.changeValue2(e)}
                />
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label>
                <InputComponent

                  
                  label="I Like AngularJS"
                  type="checkbox"
                  name="like"
                  value="angularjs"

                  onChange={e => this.changeValue2(e)}
                />
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label>
                <InputComponent

                  
                  label="I Like VueJS"
                  type="checkbox"
                  name="like"
                  value="vuejs"

                  onChange={e => this.changeValue2(e)}
                />
              </Label>
            </FormGroup>
          </FormGroup>

          <Button color="primary" name="signup"  onClick={e => this.submitValue(e)}>SignUp</Button>
        
      </div>
    );
  }
}

export default App;
