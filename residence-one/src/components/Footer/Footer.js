import React from "react";
var residence_one = require("./residence_one.png");

export const Footer = () =>
{
    return (

        <div className="logo">
            <img src={residence_one} alt="logo" height="40" width="200" />
            <span style={{fontSize:"25px"}}>&copy;2019</span>
        </div>
    )
}