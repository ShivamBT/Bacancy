import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEventList, getEventTypes } from "../ApiCalls/ApiCalls";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledTooltip
} from "reactstrap";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Select from "react-select";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import ReactTooltip from "react-tooltip";
import "./Events.css";



const localizer = BigCalendar.momentLocalizer(moment);

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: "",
      data: [],
      event2: [{ title: "null", value: 0 }],
      dataLength: "",
      count: 0,
      eventModal: false,
      eventTypes: [],
      date: [new Date(), new Date()]
    };
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
    this.tooltipHandler = this.tooltipHandler.bind(this);
    this.EventComponent = this.EventComponent.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.eventToggler = this.eventToggler.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(date) {
    this.setState({ date: date });
  }

  eventToggler() {
    this.setState({ eventModal: !this.state.eventModal });
  }

  clickHandler(event, e) {
    console.log("click event and e:", event, e);
    this.eventToggler();
  }

  EventComponent = (props) => {
    console.log("Custom Component render :",props);
    return (
      <div>
        <a data-tip={props.event.desc}>
          <p
            onClick={this.eventToggler}
            style={{ backgroundColor: props.event.event_type.colorCode }}
            id="tooltip">
            {props.event.title}
          </p>
        </a>
        <ReactTooltip className="customtheme" delayHide={1000}/>
{/*        
        <UncontrolledTooltip target="tooltip">
          <div style={{ backgroundColor: "white", color: "black" }}>
            <p>{props.event.title}</p>
            <p>{props.event.desc}</p>
          </div>
        </UncontrolledTooltip> */}
      </div>
    );
  };

  tooltipHandler(event) {
    return event.title;
  }

  eventStyleGetter(event, start, end, isSelected) {
    console.log("Event props are :", event);
    let style = {
      backgroundColor: event.event_type.colorCode,
      color: "white"
    };

    return {
      style: style
    };
  }

  async componentDidMount() {
    await this.setState({
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token")
    });
    let result = await getEventList(this.state.id, this.state.token);
    console.log("Results of events are :", result);
    let result2 = await getEventTypes(this.state.token);
    let eventTypes = [];
    for (let i = 0; i < result2.data.data.length; i++) {
      eventTypes[i] = { label: result2.data.data[i].type, value: i + 1 };
    }

    this.setState({
      data: result.data.data,
      dataLength: result.data.data.length,
      eventTypes
    });
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
              //tooltipAccessor={this.tooltipHandler}
              //eventPropGetter={this.eventStyleGetter}
              toolbar={true}
              components={{
                //event: this.EventComponent,
                eventWrapper:this.EventComponent
              }}
              selectable={true}
              onSelectSlot={this.clickHandler}
              // onSelectEvent={this.clickHandler}
              // onSelecting={this.clickHandler}
              // onDrillDown={this.clickHandler}
            
            />
          </div>

          <Modal isOpen={this.state.eventModal} toggle={this.eventToggler}>
            <ModalHeader toggle={this.eventToggler}>Set Event</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Title</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>Private Event</Label>
                  <br />
                  <Toggle defaultChecked={false} />
                </FormGroup>
                <FormGroup>
                  <Label>Event Type</Label>
                  <Select options={this.state.eventTypes} />
                </FormGroup>
                <FormGroup>
                  <Label>Event Date</Label>
                  <DateTimeRangePicker
                    value={this.state.date}
                    onChange={this.changeDate}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
