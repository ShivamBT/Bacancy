import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEventList } from "../ApiCalls/ApiCalls";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";

const localizer = BigCalendar.momentLocalizer(moment);

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: "",
      data: [],
      event2: [{title:"null" ,value:0}],
      dataLength: "",
      count:0
    };
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
    this.tooltipHandler = this.tooltipHandler.bind(this);
    this.EventComponent = this.EventComponent.bind(this);
  }

  EventComponent =() => {
    // let result = await getEventList(localStorage.getItem("id"), localStorage.getItem("token"));
    // let data = result.data.data;
    // let i = 0;
    // let count = { ...this.state.count };
    console.log("Custom Component render :");
    // await this.setState({ count: count + 1 });
   // console.log(this.state.event2[this.state.count-1].title || "null");
    return <p>Hello world</p>;
  };

  tooltipHandler(event) {
    return (event.title);
  }

  async eventStyleGetter(event, start, end, isSelected)
  {
    console.log("Event props are :", event);
    let style = {
      backgroundColor:event.event_type.colorCode,
      color: "white"
    };
    console.log("Color here is :", event.event_type.colorCode);
    if (this.state.event2[this.state.event2.length-1].value <= this.state.dataLength)
    {
      let object = {};
      let event2 = [...this.state.event2];
      object["id"] = event.id;
      object["title"] = event.title;
      object["value"] = this.state.event2[this.state.event2.length - 1]["value"] + 1;
      event2 = [...event2, object];
      await this.setState({ event2 });
    }
    
    return {
      style: style
    };
  };

  async componentDidMount() {
    await this.setState({
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token")
    });
    let result = await getEventList(this.state.id, this.state.token);
    console.log("Results of events are :", result);
    this.setState({ data: result.data.data ,dataLength:result.data.data.length });
  }

  render() {
    return (
      <div className="main">
        <div className="sidebar">
          <Sidebar {...this.props} />
        </div>
        <div className="logout">
          <LogOutComponent {...this.props} />
        </div>

        <div style={{ marginLeft: "20%" }}>
          <h1>Events</h1>
          <div style={{ height: "700" }}>
            <BigCalendar
              style={{ height: 500 }}
              localizer={localizer}
              events={this.state.data}
              startAccessor="start"
              endAccessor="end"
              tooltipAccessor={this.tooltipHandler}
              eventPropGetter={this.eventStyleGetter}
              toolbar={true}
              // components={{
              //   event: this.EventComponent
              // }}
            />
          </div>
        </div>
      </div>
    );
  }
}
