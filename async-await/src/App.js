import React, { Component } from 'react';
import axios from 'axios';

const myFunc=async () =>
  {
  /* let value =await axios.get("https://reqres.in/api/users/");
   console.log("Result: ", value);
   return value;*/
   

   let value2=await Promise.all([axios.get("https://reqres.in/api/users/4"),
   axios.get("https://reqres.in/api/users/5"),
   axios.get("https://reqres.in/api/users/6"),
   axios.get("https://reqres.in/api/users/7")]);

   return value2;

 /*.then(res => {
       console.log("Result: ",res);
       return res;
     })
   )*/
    }

const chain1=()=>
{
  return "Hello";
}

const chain2=(x)=>
{
  return x + " my";
}

const chain3=(x)=>
{
  return x + " name";
}

const chain4=(x)=>
{
  return x + " is";
}

const chain5=(x)=>
{
  return x + " Shivam";
}



const chaining=async ()=>{

  let res1=await chain1();
  let res2=await chain2(res1);
  let res3=await chain3(res2);
  let res4=await chain4(res3);
  let res5=await chain5(res4);

  console.log("Final string is :",res5);
  return res5;

} 


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      data:[]
    }
    this.myData=this.myData.bind(this);
  }

  componentDidMount()
  {
    this.myData();
  }

 

  myData=async() =>
  {
    let value =await myFunc();
    console.log("results are:" , value);

    let value2=await chaining();
    console.log("final string: ",value2); 
  }



  render() 
  {
   
    return (
   
      <div className="App">
        <h1> Posts retrieved from promises are:-</h1>
          <div>
         
          </div>
       
      </div>
    );
  }
}

export default App;
