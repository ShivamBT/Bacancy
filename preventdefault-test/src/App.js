import React, { Component } from "react";
import { InputComponent } from "./Components/InputComponent";
import { Textarea } from "./Components/Textarea";

import "./App.css";
import { Button } from "reactstrap";
import { Form, FormGroup, Label , Container ,Row,Col,Badge} from "reactstrap";


const dstyle={
  color: 'red',
}




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
    this.validate=this.validate.bind(this);
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
    // if(this.state.signup.length===0)
    //   {
    //     alert("Fields empty!!")
    //     return false;
    //   }
      
    let data={...this.state.data};
  
    if(this.submitValidation() && this.userCheck(data))
    {
      await this.setState({signup : [...this.state.signup,this.state.data]});

      console.log("Value Submitted: " , this.state)
      
      alert("User registed Successfully !!");
    }
    
     
  }

 //Submit Function end

  // Main Validation Function starts here

  async validate(e)
  {
      if(e.target.name==="name")
      {
          let x=e.target.value;

          this.validateName(x);
      }

      else if(e.target.name==="email")
      {
          let x=e.target.value;

          this.validateEmail(x);
      }

     else if(e.target.name==="password")
      {
          let x=e.target.value;

          this.validatePassword(x);
      }

      else if(e.target.name==="confirm_password")
      {
          let x=e.target.value;
          
          this.validateConfirmPassword(x);

           
     }

      else if(e.target.name==="phone_number")
      {
          let x=e.target.value;

          this.validateNumber(x);
      }
  }

//Main Validation function ends here



//Individual Validation methods start here

  async validateName(x)
    {   
       await this.setState({valid_name:false});

       let regex= /^[a-zA-Z ]{2,30}$/.test(x);
             
       await this.setState({valid_name:regex});

       console.log("regex is: ",regex);
    }

    async validateEmail(x)
    {
        await this.setState({valid_email:false});
        
        let regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x);

        await this.setState({valid_email:regex});

        console.log("regex is: ",regex);
    }

   async validatePassword(x)
    {
        await this.setState({valid_password:false});
       
        console.log("Value of password: ",x);

        let regex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);

        await this.setState({valid_password:regex});

        console.log("regex is: ",regex);
    }


    async validateConfirmPassword(x)
    {
        await this.setState({valid_confirm_password:false,valid_password_match:false});

        let regex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);

        console.log("Value of password: ", this.state.data.password);
        console.log("Value of confirm password: ",x);

        if(regex && this.state.data.password===this.state.data.confirm_password)
        {
                        
          
          await this.setState({valid_confirm_password:regex,valid_password_match:true});
        }

        else if(regex)
        {

         // alert("Passwords Do Not Match");
               
          await this.setState({valid_confirm_password:regex});

        }

    }
    

    async validateNumber(x)
    {
        await this.setState({valid_phone_number:false});

        let regex= /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(x);

        await this.setState({valid_phone_number:regex});

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
        {/* <h1 style={pstyle}>Registration Form</h1>
        <h2>{this.state.field ? null : <p style={dstyle}>All Fields except Likes and Address are compulsory</p>}</h2>
         */}
        
        <Container>
        <Row>
          <Col md={{offset:4}}>
             <h1 >
             <Badge1/>
             </h1>
           
          </Col>

          <Col md={{offset:2}}>

          <h2>{this.state.field ? null : <Badge4 />}</h2>
     

          </Col>
        </Row>
         <Form>
         <Row form>
            <Col >
            <FormGroup>
              <Label>
              <InputComponent label="Name"  id="1"  type="text" name="name" onChange={e => this.changeValue(e)} onBlur={e => this.validate(e)}/>
              </Label>
              {this.state.valid_name ? null : <Badge5 /> }
              
              
          
            </FormGroup>

            </Col>
            <Col>
            <FormGroup>
              <Label>
              <InputComponent   label="E-Mail" type="email" name="email" onChange={e => this.changeValue(e)} onBlur={e => this.validate(e)}/>
              </Label>
              {this.state.valid_email ? null : <Badge6 />}
           
            </FormGroup>
            </Col>
          </Row>
         
          
      
          

          
          
          

         <Row form>
           <Col>

           <FormGroup>
              <Label>

              <InputComponent
                
                label="Password"
                type="password"
                name="password"
                value={this.state.password}

                onChange={e => this.changeValue(e)}
                onBlur={e => this.validate(e)}
              />
              </Label>
              {this.state.valid_password ? null : <Badge7 />}
          
          </FormGroup>

           </Col>

           <Col>
           <FormGroup>
              <Label>

              <InputComponent

                label="Confirm Password"
                type="password"
                name="confirm_password"
                value={this.state.confirm_password}
               

                onChange={e => this.changeValue(e)}
                onBlur={e => this.validate(e)}
              
                
              />
              </Label>
              {this.state.valid_confirm_password ? null : <Badge8 />}
              { this.state.valid_password_match ? null : <Badge9 />} 
           
          </FormGroup>

           </Col>
         </Row>


         

          
        


        <Row form>
          <Col>

          <FormGroup>
                <Label>
                <InputComponent
                
                label="Phone Number"
                type="number"
                name="phone_number"

                onChange={e => this.changeValue(e)}
                onBlur={e => this.validate(e)}
                />
                </Label>
              {this.state.valid_phone_number ? null : <Badge10 />}

          </FormGroup>  

          </Col>

          <Col>
           
          <FormGroup>
              <Label>
              <Textarea label="Address"  type="textarea" name="address" onChange={e => this.changeValue(e)} onBlur={e => this.validate(e)}/>
              </Label>
            
              
          
          </FormGroup>

          </Col>
        </Row>
                    
          
          
          
        
 
           <Row form> 
             <Col>
             <FormGroup tag="fieldset">
            <legend><Badge2 /></legend>
            {/* {this.state.radio ? null : <p style={dstyle}> Please select one of the Gender</p>} */}
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
             </Col>

             <Col>
             <FormGroup tag="fieldset">
            <legend><Badge3 /></legend>

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

             </Col>
           </Row>


          

          <Row form>
            <Col xs={{size: 'auto' , offset: 5}}>
            <Button color="primary" name="signup"  onClick={e => this.submitValue(e)}>SignUp</Button>
         
            </Col>
          </Row>
          
        </Form>

        </Container>
             
      </div>
    );
  }
}

export default App;
