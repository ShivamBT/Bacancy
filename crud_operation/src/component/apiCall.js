import React,{Component} from 'react';
import { postInterceptor,putInterceptor,deleteInterceptor,getInterceptor } from './HttpInterceptor';
// import { postInterceptor,putInterceptor,deleteInterceptor,getInterceptor } from './';

const postData = (first_name,last_name) =>
{

  let urlfinal=`/users/${first_name}${last_name}`;
    return postInterceptor(urlfinal);

}



const editData= (Id,first_name,last_name) =>
{
  let urlfinal=`/users/${Id}${first_name}${last_name}`;
     return putInterceptor(urlfinal);
}



const deleteRecord=(id)=>
{

 let urlfinal=`/users${id}`;
   return deleteInterceptor(urlfinal);
}


  
const getData=(current_page)=>
{ 
    console.log("function called");
       let urlfinal=`/users?page=${current_page}`;
       return getInterceptor(urlfinal);
}
  

const getUserData=(id) =>
{
      
      let urlfinal=`/users/${id}`;
    return getInterceptor(urlfinal);
}

export {postData,editData,deleteRecord,getData,getUserData};