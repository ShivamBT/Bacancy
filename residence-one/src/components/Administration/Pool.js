import React, { Component } from "react";
import { getPoolData } from "./../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";


export class Pool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            data: null,   
        }
    }


    async componentDidMount() {
        await this.setState({ token: localStorage.getItem("token") });
        let result = await getPoolData(this.state.token);
        console.log("result is :", result);
    }


    render() {
        return (
            <div className="main">
                <div className="sidebar">
                    <Sidebar {...this.props}/>
                </div>
                <div className="logout">
                    <LogOutComponent {...this.props}/>
                </div>

                <div className="mainHeading">
                    Hello
                </div>
            </div>
        )
    }
}

