import { postInterceptor,putInterceptor,deleteInterceptor } from './HttpInterceptor';
import axios from 'axios';
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
  return(
         axios.get(`https://reqres.in/api/users?page=${current_page}`)
    )
}
  

const getUserData=(id) =>
{
    
  return(

    axios.get(`https://reqres.in/api/users/${id}`)
   
     )
}

export {postData,editData,deleteRecord,getData,getUserData};