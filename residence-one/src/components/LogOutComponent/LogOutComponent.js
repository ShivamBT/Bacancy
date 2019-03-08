import React, { Component}from "react";
import { Button } from "reactstrap";


export class LogOutComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.logOutHandler = this.logOutHandler.bind(this);
    }

    logOutHandler = () => {
        localStorage.removeItem("token");
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