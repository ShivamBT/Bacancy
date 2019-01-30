import React,{Component} from 'react';
import axios from 'axios';
import { reject } from 'q';

export const postData = (first_name,last_name) =>{
    
    axios.post('https://reqres.in/api/users',
    {first_name:first_name,

    last_name:last_name}
    )
    .then(json => {
        console.log("User Added: " , json);
    })
    .catch(function (error){
        console.log("Error of post data");
    })

}

export const editData= (Id,first_name,last_name) =>
{
    axios.post(`https://reqres.in/api/users/${Id}`, { first_name:first_name, last_name: last_name })
      .then(function (res) {
        console.log("Data Edited: ", res);
      })
      .catch(function (error) {
        alert("Error of editdata");
      });
}



export const deleteRecord=(id)=>{
    return (
        axios.delete(`https://reqres.in/api/users/${id}`)
    .then((res)=> {
        return res;
    })
    )
    .catch(function (error){
        console.log("error of deleteRecord");
    })
}


  
export const getData=(current_page)=>{ 
  return  axios.get(`https://reqres.in/api/users?page=${current_page}`)
        .then(res => {
            console.log("Data:", res);
            return res;
        })
        .catch(function (error) {
          alert("Error of getData!!");
        });
}
  

export const getUserData=(id) =>{
      return axios.get(`https://reqres.in/api/users/${id}`)
      .then(res => {
          return res;
      })
      .catch(function (error){
          alert("Error of edit user!!");
      })
}