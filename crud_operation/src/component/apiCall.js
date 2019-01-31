import React,{Component} from 'react';
import axios from 'axios';
import { postInterceptor,putInterceptor,deleteInterceptor,getInterceptor } from './HttpInterceptor';
// import { postInterceptor,putInterceptor,deleteInterceptor,getInterceptor } from './';

const postData = (first_name,last_name) =>
{
  
  let argument = {
      first_name:first_name,
      last_name:last_name
    }
    
    return postInterceptor(argument);
  
}



const editData= (Id,first_name,last_name) =>
{
  let argument = {
    id:Id,
    first_name:first_name,
    last_name:last_name
  }
     return putInterceptor(argument);
}



const deleteRecord=(id)=>
{

 let argument={
   id:id
 }
   return deleteInterceptor(argument);
}


  
const getData=(current_page)=>
{       
  let urlfinal="/users/?page=";
  let argument={
    page:current_page
  }
       return getInterceptor(urlfinal,argument);
}
  

const getUserData=(id) =>
{
    let urlfinal="/users/";
    let argument={
      id:id
    }
    return getInterceptor(urlfinal,argument);
}

export {postData,editData,deleteRecord,getData,getUserData};