import React, { Component } from "react";
import "./UserDetails.css"


export class DataHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      data: [],
      picture:
        "http://localhost:3001/images/lacadenelle13008fr/users/abc.jpeg"
    };
      
      this.displayHandler = this.displayHandler.bind(this);
  }

  componentDidMount() {
    console.log("component did mount called");
    let active = this.props.active;
    let string = "http://localhost:3001/images/lacadenelle13008fr/users/abc.jpeg";
    this.setState({ active, data: this.props.data, picture: this.state.data.picture || string});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update called");
    if (prevProps !== this.props) {
      let string="http://localhost:3001/images/lacadenelle13008fr/users/abc.jpeg";
      this.setState({ active: this.props.active,data:this.props.data,picture:this.state.data.picture || string });
    }
  }
    
    displayHandler()
    {
        if (this.state.active === "profile")
        {
            return (<div>
                <p>Profile pic</p>
                <img src={this.props.data.picture} alt="Profile Picture" />
            </div>)
            
            }
         
    }

  render() {
    return (
      <div
        className="displayBlock">
        {console.log("return reached")}
        {this.state.active} is rendered;
        {this.displayHandler}
        <img src={this.state.picture} alt="Profile Picture" />
      </div>
    );
  }
}
