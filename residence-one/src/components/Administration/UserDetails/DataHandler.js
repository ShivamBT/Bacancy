import React, { Component } from "react";
import "./UserDetails.css"


export class DataHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    };
      
      this.displayHandler = this.displayHandler.bind(this);
  }

  componentDidMount() {
    console.log("component did mount called");
    let active = this.props.active;
    this.setState({ active });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update called");
    if (prevProps !== this.props) {
      this.setState({ active: this.props.active });
    }
  }
    
    displayHandler()
    {
        if (this.state.active === "profile")
        {
            return (<div>
                <p>Profile pic</p>
                <img src="" alt="Profile Picture" />
            </div>)
            
            }
         
    }

  render() {
    return (
      <div style={{ backgroundColor: "red", color: "black" }} className="displayBlock">
        {console.log("return reached")}
        {this.state.active} is rendered;
        {this.displayHandler}
      </div>
    );
  }
}
