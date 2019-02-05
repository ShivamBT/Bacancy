import React, { Component,Fragment } from 'react';

import './App.css';

const element={
  data:[
    {
      id: "1",
      name:"Shivam",
      button:"Cancel"
    },

    {
      id:"2",
      name:"Rajat",
      button:"Submit"
    },

    {
      id:"3",
      name:"Shubham",
      button:"Click Me!"
    }
  ]
}

const WithFragment=(props)=>
{
  return(
    <>
     {
      props.items.data.map(i=>{
        return(
          <Fragment key={i.id}>
            <h1>Id is : {i.id}</h1>
            <h2>Name is : {i.name}</h2>
            <button>{i.button}</button>
          </Fragment>
        )
        
        
      })
     }
    </>
    )
  
  }

  const WithoutFragment=(props)=>{
    return(
      <div>
        <h1>Without Fragment</h1>
        <h2>This is {props.name}</h2>
        <button>Click Me</button>
  
      </div>
      )
    
    }
  

    const WithArray=(props)=>{
      return(
        [
          <h1 key="1">With Array</h1>,
          <h2 key="2">This is {props.name}</h2>,
          <button key="3">Click Me</button>
    
         ]
              
      
      )
      
      }



class App extends Component {
  render() {
    return (
      <>
        <WithFragment items={element}/>
        <WithoutFragment name="Shivam"/>
        <WithArray name="Shivam" />
      </>
    );
  }
}

export default App;
