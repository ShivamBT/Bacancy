import React, { Component } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Jumbotron } from "reactstrap";
import "./Dashboard.css";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  
  componentWillMount()
  {
    let x = localStorage.getItem("token");
    if (x === null)
    {
      this.props.history.push("/");
      }
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="dashboard">
          <Jumbotron>
            <h1>Dashboard</h1>
            <p>Logged In</p>
          </Jumbotron>
          
        </div>

        <div className="logout">
          <LogOutComponent {...this.props}/>
        </div>
      </div>
    );
  }
}
