import React from "react";
import axios from "axios";

export const getUserList = (value,token) =>
{
    return axios.get(`http://localhost:8080/api/user/list?limit=40&status=${value}`, {
        headers: {
            token:token
        }
    })

}