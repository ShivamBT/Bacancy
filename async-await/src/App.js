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


    }

const chain1=()=>
{
  return new Promise((resolve,reject)=> {
    resolve("Hello");
  })
  
}




const chain2=(x)=>
{
  return new Promise((resolve,reject)=> {
    resolve (x + " my");
  }) 
  
}

const chain3=(x)=>
{
  return new Promise((resolve,reject) =>{
    resolve(x + " name");
  }
)
}

const chain4=(x)=>
{
  return new Promise((resolve,reject) => {
    resolve(x + " is");
  })
}

const chain5=(x)=>
{
  return new Promise((resolve,reject) => {
    resolve(x + " Shivam");
  })
  
}








const promiseChain=() =>{
 
   return (
      chain1()
      .then(res1 => {
        return chain2(res1);
      })
       .then(res2 => {
         return chain3(res2);
      })
       .then(res3 => {
         return chain4(res3);
      })
        .then(res4 => {
          return chain5(res4);
       })
         .then(res5 => {
            console.log("Result of Promise Chain: ", res5);
           return (res5);
        }))
  
  
}
  /*
  chain1()
  .then(res1 => {
    return chain2(res1);
  })
  .then(res2 => {
    return chain3(res2);
  })
  .then(res3 => {
    return chain4(res3);
  })
  .then(res4 => {
    return chain5(res4);
  })
  .then(res5 => {
    console.log("Result of Promise Chain: ", res5);
    return res5;
  })
  .catch(function (error){
    console.log("Error")
  })
}*/







const asyncAwaitChain=async ()=>{

  let res1=await chain1();
  let res2=await chain2(res1);
  let res3=await chain3(res2);
  let res4=await chain4(res3);
  let res5=await chain5(res4);
  
  

  console.log("Result Of Async Await Chain :",res5);
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
    console.log("[Promise.all] : " , value);

   let value2=await asyncAwaitChain();
    console.log("Async Await Final string: ",value2); 

    promiseChain()
    .then(res =>{
      console.log("Promise Final String: ",res);
    })
    
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
