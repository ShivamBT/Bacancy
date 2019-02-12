import React, { Component } from "react";
import { InputComponent } from "./Components/InputComponent";
import { Textarea } from "./Components/Textarea";
import {FaEnvelope} from "react-icons/fa";



import "./App.css";
import { Button } from "reactstrap";
import { Form, FormGroup, Label , Container ,Row,Col,Badge,InputGroup} from "reactstrap";






const Badge1 = () =>
{
  return(
    <div>
      <h1>
      <Badge color="secondary">
      Registration Form
      </Badge>
      </h1>
      
    </div>
  )
}

const Badge2 = () =>
{
  return(
    <Badge color="secondary">
      Gender
    </Badge>
  )
  }

const Badge3 = () =>
{
  return(
    <Badge color="secondary">
      Likes
    </Badge>
  )
}


const Badge4 = () =>
{
  return(
  <Badge color="danger">
  All Fields except Likes and Address are compulsory
  </Badge>)
}

const Badge5=()=>
{
  return(
    <Badge color="danger">
      Invalid Name
    </Badge>
  )
}

const Badge6=()=>
{
  return(
    <Badge color="danger">
      Invalid Email
    </Badge>
  )
}

const Badge7=()=>
{
  return(
    <Badge color="danger">
      Invalid Password
    </Badge>
  )
}

const Badge8=()=>
{
  return(
    <Badge color="danger">
      Invalid Confirm Password
    </Badge>
  )
}

const Badge9=()=>
{
  return(
    <Badge color="danger">
      Passwords do not match
    </Badge>
  )
}

const Badge10=()=>
{
  return(
    <Badge color="danger">
      Invalid Phone Number
    </Badge>
  )
}



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{                                               //Data Object is used to store data temporarily
      name: "",
      address: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      gender: "",
      like: [],
      
    },
      signup:[],                                          //Signup array Stores User Data in each of its element


      valid_name:true,                                  // These valid_variables are used to store boolean values which are result of validation functions
      valid_email:true,
      valid_password:true,
      valid_confirm_password:true,
      valid_phone_number:true,
      valid_password_match:true,
      field:true,

    }

    this.changeValue=this.changeValue.bind(this);
    this.changeValue2=this.changeValue2.bind(this);
    this.submitValue=this.submitValue.bind(this);
    this.validateName=this.validateName.bind(this);
    this.validateEmail=this.validateEmail.bind(this);
    this.validatePassword=this.validatePassword.bind(this);
    this.validateConfirmPassword=this.validateConfirmPassword.bind(this);
    this.validateNumber=this.validateNumber.bind(this);
    this.submitValidation=this.submitValidation.bind(this);
    this.userCheck=this.userCheck.bind(this);
    
  }







//Change Value Functions Start here

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

//Change Value Functions end here
  


//Submit Function Start
  async submitValue(e)
  {
    let data={...this.state.data};
    if(this.submitValidation() && this.userCheck(data))
    {
      await this.setState({signup : [...this.state.signup,this.state.data]});
      console.log("Value Submitted: " , this.state)
      alert("User registed Successfully !!");
    }
    
     
  }
  

 //Submit Function end

  


//Individual Validation methods start here

   validateName(e)
    { 
      let x=e.target.value;
       this.setState({valid_name:false});
       let regex= /^[a-zA-Z ]{2,30}$/.test(x);
       this.setState({valid_name:regex});
       console.log("regex is: ",regex);
    }


     validateEmail(e)
     {
        let x=e.target.value;
        this.setState({valid_email:false});
        let regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x);
        this.setState({valid_email:regex});
        console.log("regex is: ",regex);
      }

    validatePassword(e)
    {
      let x=e.target.value;
         this.setState({valid_password:false});
         console.log("Value of password: ",x);
         let regex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);
         this.setState({valid_password:regex});
         console.log("regex is: ",regex);
    }


      validateConfirmPassword(e)
      {
        let x=e.target.value;
        this.setState({valid_confirm_password:false,valid_password_match:false});
        let regex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);
        console.log("Value of password: ", this.state.data.password);
        console.log("Value of confirm password: ",x);

        if(regex && this.state.data.password===this.state.data.confirm_password)
        {
          this.setState({valid_confirm_password:regex,valid_password_match:true});
        }

        else if(regex)
        {               
           this.setState({valid_confirm_password:regex});
        }

       }
    
      validateNumber(e)
       {
         let x=e.target.value;
         this.setState({valid_phone_number:false});
         let regex= /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(x);
         this.setState({valid_phone_number:regex});
        console.log("regex is: ",regex);
       }

  
      submitValidation()
      {
        console.log("Submit Validation called");
        this.setState({field:false});
        if(this.state.data.name==='')
        {
           console.log("If called");
           this.setState({field:false});
           return false;
        } 
      
        else if(this.state.data.email==='')
        {
           console.log("If called");
           this.setState({field:false});
           return false;
        }

        else if(this.state.data.password==='')
        {
          console.log("If called");
          this.setState({field:false});
          return false;
        } 
      
        else if(this.state.data.confirm_password==='') 
        {
          console.log("If called");
          this.setState({field:false});
          return false;
        }
      
        else if(this.state.data.phone_number==='')
        {
          console.log("If called");
          this.setState({field:false});
          return false;
        } 
      
        else if(this.state.data.gender==='')
        {
          console.log("If called");
          this.setState({field:false});
          return false;
        }   
      
        else
        {
          console.log("else called");
          this.setState({field:true});
          return true;
        }
     }


    userCheck(data)
    {
     for(let i=0 ; i<this.state.signup.length ; i++)
      {
        if(data.email===this.state.signup[i].email)
        {
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
      <div className="App">
        <Container>
          <div className="inner">
             <h1 className="h1">
               <Badge1/>
             </h1>
             <br/>
             
             <Row>
              <Col md={{offset:3}}>
                <h2>{this.state.field ? null : <Badge4 />}</h2>
                <br/>
              </Col>
             </Row>

            <Form>
             <FormGroup tag="fieldset">
             
             <Row form className="row">
              <Col>
               <FormGroup>
                <Label>
                  <InputComponent label="Name"  invalid={!this.state.valid_name} id="1"  type="text" name="name" onChange={e => this.changeValue(e)} onBlur={e => this.validateName(e)}/>
                </Label>
              {this.state.valid_name ? null : <Badge5 /> }
               </FormGroup>
              </Col>
             </Row>
             
             
             <Row form className="row">
              <Col>
               <FormGroup>
                <Label>
                  <InputComponent   label="E-Mail"  invalid={!this.state.valid_email} type="email" name="email" onChange={e => this.changeValue(e)} onBlur={e => this.validateEmail(e)}/>
                </Label>
              {this.state.valid_email ? null : <Badge6 />}
               </FormGroup>
              </Col>
            </Row>
              
              
            <Row form className="row">
              <Col>
               <FormGroup>
                <Label>
                  <InputComponent label="Password" type="password" name="password"  invalid={!this.state.valid_password} value={this.state.password} onChange={e => this.changeValue(e)} onBlur={e => this.validatePassword(e)}/>
                </Label>
              {this.state.valid_password ? null : <Badge7 />}
               </FormGroup>
              </Col>
             </Row>
             
             
             <Row form className="row">
              <Col>
               <FormGroup>
                <Label>
                  <InputComponent label="Confirm Password" type="password" name="confirm_password"  invalid={!this.state.valid_confirm_password} value={this.state.confirm_password} onChange={e => this.changeValue(e)} onBlur={e => this.validateConfirmPassword(e)} />
              </Label>
              {this.state.valid_confirm_password ? null : <Badge8 />}
              { this.state.valid_password_match ? null : <Badge9 />} 
               </FormGroup>
              </Col>
             </Row>

             
             <Row form className="row">
              <Col>
               <FormGroup>
                <Label>
                  <InputComponent label="Phone Number" type="number" name="phone_number"  invalid={!this.state.valid_phone_number} onChange={e => this.changeValue(e)} onBlur={e => this.validateNumber(e)} />
                </Label>
              {this.state.valid_phone_number ? null : <Badge10 />}
               </FormGroup>  
              </Col>
             </Row>         
          
          
             <Row form className="row">
              <Col>
               <FormGroup>
                <Label>
                  <Textarea label="Address"  type="textarea" name="address" onChange={e => this.changeValue(e)} onBlur={e => this.validate(e)}/>
                </Label>
               </FormGroup>
              </Col>
             </Row>
          
          
             <Row form> 
               <legend className="genderlegend"><Badge2 /></legend>
               <Col >
                <FormGroup check>
                 <Label>
                   <InputComponent label="Male" type="radio" name="gender" value="male" onChange={e => this.changeValue(e)} />
                 </Label>
                </FormGroup>
               </Col>
             
               <Col >
                <FormGroup check>
                 <Label>
                   <InputComponent label="Female" type="radio" name="gender" value="female" onChange={e => this.changeValue(e)} />
                 </Label>
                </FormGroup>
               </Col>
             </Row>
         

             <Row>
               <legend className="legend"><Badge3 /></legend>
               <Col>
                <FormGroup check>
                 <Label>
                   <InputComponent label="I Like ReactJS" type="checkbox" name="like" value="reactjs" onChange={e => this.changeValue2(e)} />
                 </Label>
                </FormGroup>
               </Col>

               <Col>
                <FormGroup check>
                 <Label>
                   <InputComponent label="I Like AngularJS" type="checkbox" name="like" value="angularjs" onChange={e => this.changeValue2(e)} />
                 </Label>
                </FormGroup>
               </Col>

               <Col>
                <FormGroup check>
                 <Label>
                   <InputComponent label="I Like VueJS" type="checkbox" name="like" value="vuejs" onChange={e => this.changeValue2(e)} />
                 </Label>
                </FormGroup>
               </Col>
             </Row>
             
             
             <Row form>
              <Col xs={{size: 'auto' , offset: 5}}>
                <Button color="primary" name="signup" className="button"  onClick={e => this.submitValue(e)}>SignUp</Button>
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
