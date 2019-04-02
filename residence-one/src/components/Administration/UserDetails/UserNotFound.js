import React from "react";
import {Link} from "react-router-dom";

export const UserNotFound =()=>
{
    return (
        <div>
            <p>Unfortunately No User Id Available for this user.</p>
            <Link to="/administration/families">Click Here to Go back to Families Page</Link>
        </div>
    )
}