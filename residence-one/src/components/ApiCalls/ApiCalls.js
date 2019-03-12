import axios from "axios";

export const logIn = (email, password) => {
    return axios.post(`http://localhost:8080/api/user/login`, {
        email: email,
        password: password
    });
}

export const logOut = () =>
{
    return axios.get(`http://localhost:8080/api/user/logout`);

}


export const getUserList = (status,current_page,search,token) =>
{
    return axios.get(`http://localhost:8080/api/user/list?page=${current_page}&limit=20&${search.id}=${search.value}&status=${status}`, {
        headers: {
            token: token
        }
    });

}


export const getStructureList = (current_page, search, token) =>
{
    return axios.get(`http://localhost:8080/api/entry/structure?page=${current_page}&${search.id}=${search.value}`, {
        headers: {
            token: token
        }
    });
}


