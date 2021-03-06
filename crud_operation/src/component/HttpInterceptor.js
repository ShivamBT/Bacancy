import axios from 'axios';
const url="https://reqres.in/api";


export const postInterceptor=(argument) =>{

  
    return (
        axios.post("https://reqres.in/api/users/",argument)
        .then(json => {
        console.log("User Added: " , json);
        })
        .catch(function (error){
            alert("Error of post data");
        })

    )
}


export const putInterceptor=(argument) =>{

    return(
        axios.put("https://reqres.in/api/users/",argument)
       .then(res => {
        console.log("User Edited: ", res);
       })
        .catch(function (error) 
       {
         alert("Error of editdata");
       })
    );
}


export const deleteInterceptor=(argument) =>{


    return (
        axios.delete("https://reqres.in/api/users/",argument)
        .then(res=> {
            return res;
        })
     
    .catch(function (error)
        {
            alert("error of deleteRecord");
        })
    );
}


export const getInterceptor = (urlfinal,argument) =>{

    let complete_url=`${url}${urlfinal}`;

    return axios.get(complete_url,argument)
        .then(res => {
            console.log("Data:", res);
            return res;
        })
        .catch(function (error) 
        {
          alert("Error of get");
        })
    
}
  
