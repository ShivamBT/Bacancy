import React, { Component } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Jumbotron } from "reactstrap";
import "./Dashboard.css";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import { Footer } from "../Footer/Footer";
import {Helmet} from "react-helmet"

export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Dashboard of residence" />
        </Helmet>
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>

        <div className="dashboard">
          <div className="logout">
            <LogOutComponent {...this.props} />
          </div>
          <Jumbotron>
            <h1>Dashboard</h1>
            <p>Logged In</p>
          </Jumbotron>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
