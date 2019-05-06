import React, { Component } from "react";
import "./App.css";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { Input, Label, Form, FormGroup, Row, Col } from "reactstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMulti: true,
      selectValue: null,
      options1: [
        { label: "Ahmedabad", value: 1 },
        { label: "Vadodra", value: 2 },
        { label: "Gandhinagar", value: 3 },
        { label: "Surat", value: 4 }
      ]
    };

    this.changeSelect = this.changeSelect.bind(this);
    this.changeRadio = this.changeRadio.bind(this);
  }

  changeSelect(e) {
    let selectValue = { ...this.state.selectValue };
    selectValue = e;
    this.setState({ selectValue });
  }

  changeRadio(value) {
    let isMulti = { ...this.state.isMulti };
    isMulti = value;
    this.setState({ isMulti });
  }
  render() {
    return (
      <div className="App">
        <Form>
          <h2>React Select Example</h2>
          <FormGroup className="mainForm">
            <Input
              type="radio"
              name="select_type"
              value={true}
              onChange={e => this.changeRadio(true)}
            />
            <Label>Multiple</Label>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <Input
              type="radio"
              name="select_type"
              value={false}
              onChange={e => this.changeRadio(false)}
            />
            <Label>Single</Label>
          </FormGroup>

          <FormGroup>
            <Select
              options={this.state.options1}
              components={makeAnimated()}
              onChange={this.changeSelect}
              isMulti={this.state.isMulti}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}
