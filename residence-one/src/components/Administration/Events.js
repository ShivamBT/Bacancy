import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEventList } from "../ApiCalls/ApiCalls";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";

export class Events extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: "",
            token:""
            
        }
    }
    async componentDidMount()
    {
        await this.setState({ id: localStorage.getItem("id") , token:localStorage.getItem("token")});
        let result = await getEventList(this.state.id, this.state.token);
        console.log("Results of events are :", result);
    }


    render()
    {
        return (
            <div className="main">
                <div className="sidebar">
                    <Sidebar {...this.props}/>
                </div>
                <div className="logout">
                    <LogOutComponent />
                </div>

                <div style={{ marginLeft: "20%" }}>
                    <h1>Events</h1>
                </div>
            </div>
        )
    }
}