import axios from 'axios';



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
