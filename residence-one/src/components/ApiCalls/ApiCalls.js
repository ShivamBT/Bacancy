import axios from "axios";
let url = "http://localhost:8080/api/";

export const logIn = (email, password) => {
    return axios.post(`${url}user/login`, {
        email: email,
        password: password
    });
}

export const logOut = () =>
{
    return axios.get(`${url}user/logout`);

}


export const getUserList = (status,current_page,search,token) =>
{
    return axios.get(`${url}user/list?page=${current_page}&limit=20&${search.id}=${search.value}&status=${status}`, {
        headers: {
            token: token
        }
    });

}


export const getStructureList = (current_page, search, token) =>
{
    return axios.get(`${url}entry/structure?page=${current_page}&${search.id}=${search.value}`, {
        headers: {
            token: token
        }
    });
}

export const signupUser = (signup) =>
{
    return axios.post(`${url}user/signup`, signup);
}
    
export const getUnitList = (current_page,search,token) =>
{
    return axios.get(`${url}unit/list?page=${current_page}&${search.id}=${search.value}`, {
        headers: {
            token:token
        }
    });
}

