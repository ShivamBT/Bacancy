import React from 'react';

export const submitValidation=(data)=>
{
  console.log("Submit Validation called");
  if (data.name === '')
  {
    console.log("If called");
    return false;
  }
  else if (data.email === '')
  {
    console.log("If called");
    return false;
  }
  else if(data.password==='')
  {
    console.log("If called");
      return false;
  } 
  else if(data.confirm_password==='') 
  {
    console.log("If called");
    return false;
  }
  else if(data.phone_number==='')
  {
    console.log("If called");
    return false;
  } 
  else if(data.gender==='')
  {
    console.log("If called");
    return false;
  }
  else
  {
    console.log("else called");
    return true;
  }
 }

export const userCheck=(data,signup) =>
{
 for(let i=0 ; i<signup.length ; i++)
  {
    if(data.email===signup[i].email)
    {
      alert("This user is already registered");
      console.log("User already registered");
      return false;
    }
   }
   return true;
}

export const getValidation = (name,value) =>
{
  if (name === "name")
  {
    let regex = /^[a-zA-Z ]{2,30}$/.test(value);
    return regex;
  }
  else if (name === "email")
  {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
    return regex;
  }
  
  else if (name === "phone_number")
  {
    let regex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(value);
    return regex;
  }
  else if (name === "password")
  {
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
    return regex;
  }
}


/*export const validation = (value, valid) =>
{
  console.log("External validation called");
  if (valid === "false" && value !=="")
  {
    return false;
  }
  if (valid === "true" && value !=="")
  {
    return true;
    }
  else
    return false;
}*/