import React from "react";
import axios from "axios";

export const getUserList = (value,current_page,token) =>
{
    return axios.get(`http://localhost:8080/api/user/list?page=${current_page}&limit=20&status=${value}`, {
        headers: {
            token:token
        }
    })

}