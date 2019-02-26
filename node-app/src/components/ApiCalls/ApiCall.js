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

export const createUser = (payload) =>
{
    return (
        axios.post("http://localhost:8080/api/students/create", payload)
    );
}

export const updateUser = (userID, payload) =>
{
    return (
        axios.put(`http://localhost:8080/api/students/update/${userID}`,payload)  
    );
}

export const deleteUserData = (id) =>
{
    return (
        axios.delete(`http://localhost:8080/api/students/delete/${id}`)
    )
}

export const searchUser = (value) =>
{
    return (
        axios.get(`http://localhost:8080/api/students/list?search=${value}`)
    )
}