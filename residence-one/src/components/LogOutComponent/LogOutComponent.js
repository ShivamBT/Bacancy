import React, { Component}from "react";
import { Button } from "reactstrap";
import { logOut } from "../ApiCalls/ApiCalls";


export class LogOutComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.logOutHandler = this.logOutHandler.bind(this);
    }

    logOutHandler = async () => {
        localStorage.removeItem("token");
        let result = await logOut();
        console.log("Result is :", result);
        this.props.history.push("/");
    }
    
    render()
    {
        return (
            <div>
                <Button color="info" onClick={this.logOutHandler}>LogOut</Button>
            </div>
        );

    }
    
}