import axios from 'axios';

export const getUrl = (e) => {
  return (
    axios.get('https://reqres.in/api/users/', {
      params: {
        page: e,
      },
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  )
}

export const DeleteRecord = (id) => {
  return (
    axios.delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log(' Data Deleted.', res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  )
}

export const getRecord = (id) => {
  return (
    axios.get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  )
}

export const updateRecord = (id, first_name, last_name) => {
  return (
    axios.put(`https://reqres.in/api/users/${id}`,
      {
        name: first_name,
        job: last_name,
      })
      .then((res) => {
        console.log('[Edit Record] Data Updated.', res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  )
}

export const addUser = (first_name, last_name) => {
  return (
    axios.post('https://reqres.in/api/users',
      {
        name: first_name,
        job: last_name,
      })
      .then((res) => {
        console.log('user is added', res);
      })
      .then(this.porps.history.push("/App")) 
      .catch((error) => {
        console.log(error);
      })
  )
}