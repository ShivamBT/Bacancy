import axios from "axios";
let apiString = "http://localhost:8080/api/students/";


export const getStudentList = () => {
  return axios.get(`${apiString}list`);
};

export const findUser = id => {
  return axios.get(`${apiString}find/${id}`);
};


export const createUser = payload => {
  return axios.post(`${apiString}create`, payload);
};

export const updateUser = (userID, payload) => {
  return axios.put(`${apiString}update/${userID}`, payload);
};

export const deleteUserData = id => {
  return axios.delete(`${apiString}delete/${id}`);
};

export const searchUser = value => {
  return axios.get(`${apiString}list?search=${value}`);
};
