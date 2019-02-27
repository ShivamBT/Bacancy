import axios from 'axios';

export const getStudentList = () =>
{
    return (
        axios.get("http://localhost:8080/api/students/list")
    );
}

export const findUser = (id) =>
{
    return (
        axios.get(`http://localhost:8080/api/students/find/${id}`)
    );
}

let apiString = "http://localhost:8080/api/students/";

export const createUser = (payload) =>
{
    return (
        axios.post(`${apiString}create`, payload)
    );
}

export const updateUser = (userID, payload) =>
{
    return (
        axios.put(`${apiString}update/${userID}`,payload)  
    );
}

export const deleteUserData = (id) =>
{
    return (
        axios.delete(`${apiString}delete/${id}`)
    )
}

export const searchUser = (value) =>
{
    return (
        axios.get(`${apiString}list?search=${value}`)
    )
}