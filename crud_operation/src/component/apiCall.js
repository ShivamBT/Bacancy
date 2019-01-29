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
        console.log()
    })

}

export const editData= (Id,first_name,last_name) =>
{
    axios.post(`https://reqres.in/api/users/${Id}`, { first_name:first_name, last_name: last_name })
      .then(function (res) {
        console.log("Data Edited: ", res);
      })
      .catch(function (error) {
        alert("Error");
      });
}


export const deleteRecord=async (Id)=> {
    return new Promise((resolve, reject) => {
        axios.delete(`https://reqres.in/api/users/${Id}`)
         .then((res) => {
           console.log('User deleted : ', res);

          resolve(res);
      })
       .catch((err) => {
        console.log("Error : ", err);
      });
    });
  }


export const deleteRecord1=(Id)=>{
    return axios.delete(`https://reqres.in/api/users/${Id}`)
    .then((res)=> {
        console.log('User Deleted: ', res);
        return res;
    })
    .catch(function (error){
        console.log("Error : ",error);
    })
}


  export const getData= async (current_page)=>{
    return new Promise((resolve, reject) => {
        axios.get(`https://reqres.in/api/users?page=${current_page}`)
        .then(res => {
            console.log("Data:", res);
         resolve(res);
        })
        .catch(function (error) {
          alert("Error!!");
        });
    })
}
  
export const getData1=(current_page)=>{ 
  return  axios.get(`https://reqres.in/api/users?page=${current_page}`)
        .then(res => {
            console.log("Data:", res);
            return res;
        })
        .catch(function (error) {
          alert("Error!!");
        });
}
  