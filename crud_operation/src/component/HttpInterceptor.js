import axios from 'axios';
const url="https://reqres.in/api";


export const postInterceptor=(urlfinal) =>{

    let complete_url=`${url}${urlfinal}`;

    return (
        axios.post(complete_url)
        .then(json => {
        console.log("User Added: " , json);
    })
    .catch(function (error){
        alert("Error of post data");
    })

    )
}


export const putInterceptor=(urlfinal) =>{

    let complete_url=`${url}${urlfinal}`;

    return(
        axios.put(complete_url)
      .then(res => {
        console.log("Data Edited: ", res);
      })
      .catch(function (error) 
      {
        alert("Error of editdata");
      })
    );
}


export const deleteInterceptor=(urlfinal) =>{

    let complete_url=`${url}${urlfinal}`;

    return (
        axios.delete(complete_url)
    .then(res=> {
         return res;
        })
     
    .catch(function (error)
        {
            alert("error of deleteRecord");
        })
    );
}


export const getInterceptor = (urlfinal) =>{

    let complete_url=`${url}${urlfinal}`;

    return axios.get(complete_url)
        .then(res => {
            console.log("Data:", res);
            return res;
        })
        .catch(function (error) 
        {
          alert("Error of get");
        })
    
}
  
// export {postInterceptor,putInterCeptor,deleteInterceptor,getInterCeptor}; 