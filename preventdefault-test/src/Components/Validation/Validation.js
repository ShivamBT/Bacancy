
export const submitValidation = (data) => {
  let arr = [];
  let i = 0;
  let m;
  for (let x in data)
  {
    m = getValidation(x, data[x],data);
    if (m) 
     arr[i++] = m;
    else
     arr[i++] = m;  
  }
  return arr;
}

export const fieldValidation = (data,valid) =>
{
  let i = 0;
  let n = true;
  let x = submitValidation(data);
  console.log(x);
  for (let m in valid)
  {
    valid[m] = x[i];
    if (x[i] === false)
      n = false;
    valid['field'] = n;
    i++;
  }
  console.log("Values in valid are :", valid);
  return valid;
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

export const getValidation = (name,value,data) =>
{

  if (name === "name")
  {
    let regex = /^[a-zA-Z ]{2,30}$/.test(value);
    console.log("name regex is: ", regex);
    return regex;
    
  }
  else if (name === "email")
  {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
    console.log("email regex is: ", regex);
    return regex;
  }
  
  else if (name === "phone_number")
  {
    let regex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(value);
    console.log("phone number regex is: ", regex);
    return regex;
  }
  else if (name === "password")
  {
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
    console.log("password regex is:",regex);
    return regex;
  }
    
  else if (name === "confirm_password")
  {
    let regex = (data['password'] === data['confirm_password'])
    console.log("confirm password regex is: ", regex);
    return regex;
  }

  else if (name === "gender")
  {
    let regex = (value !== "")
    console.log(" regex is: ", regex);
    return regex;
  }

  else if (name === "address" || name=== "like")
  {
    return true;
  }
}

export const validMain = (name,value,valid,data) =>
{
  console.log("valid main called");
  console.log("valid passed:", valid);
  console.log("data passed:", data);
  if (name === "confirm_password") {
    if (data['password'] === data['confirm_password'])
    {
      console.log("this called");
      return true;
    }

    else {
      return false;
    }
  }
  else {

    let x = getValidation(name, value);
    return x;
  }
  
}

export const invalidMessage = (name, valid) =>
{
  let m,n;
  if (name === "password")
  {
    if (valid === true)
    {
      m = "";
      return m;
    }

    else if(valid === false)
    {
      m = "Invalid Password";
      return m;
    }
  }

  else if (name === "confirm_password")
  {
    if (valid === true)
    {
      n = "";
      return n;
    }
    
    else if (valid === false)
    {
      n = "Passwords do not match";
      return n;
    }
  }
     
}