import React from 'react';

export const validateName = (e) =>
{ 
  let x=e.target.value;
   this.setState({valid_name:false});
   let regex= /^[a-zA-Z ]{2,30}$/.test(x);
   this.setState({valid_name:regex});
   console.log("regex is: ",regex);
}


export const validateEmail =(e) =>
 {
    let x=e.target.value;
    this.setState({valid_email:false});
    let regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x);
    this.setState({valid_email:regex});
    console.log("regex is: ",regex);
}
  
export const validateNumber=(e) =>
{
  let x=e.target.value;
  this.setState({valid_number:false});
  let regex= /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(x);
  this.setState({valid_number:regex});
 console.log("regex is: ",regex);
}


export const validatePassword=(e)=>
{
  let x=e.target.value;
     this.setState({valid_password:false});
     console.log("Value of password: ",x);
     let regex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(x);
     this.setState({valid_password:regex});
     console.log("regex is: ",regex);
}




export const validateConfirmPassword=(e) =>
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

 

  export const submitValidation=(e)=>
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

export const userCheck=(data) =>
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
