import React, { Component } from "react";
import "./App.css";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import {
  Input,
  Label,
  Form,
  FormGroup,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMulti: true,
      selectValue: null,
      displayList: [],
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

    if (this.state.isMulti === true) {
      let displayList = [...this.state.displayList];
      displayList = e;
      this.setState({ selectValue, displayList });
    } else {
      let displayList = [];
      displayList = [...displayList, e];
      this.setState({ selectValue, displayList });
    }
  }

  changeRadio(value) {
    let isMulti = { ...this.state.isMulti };
    isMulti = value;
    this.setState({ isMulti , displayList:[]});
  }
  render() {
    return (
      <div className="App">
        <Form>
          <Badge>
            <h2>React Select Example</h2>
          </Badge>
          <br />
          <br />
          <FormGroup className="mainForm">
            <Input
              type="radio"
              name="select_type"
              value={true}
              onChange={e => this.changeRadio(true)}
            />
            <Label>
              <h4>
                <Badge color="info">Multiple</Badge>
              </h4>
            </Label>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <Input
              type="radio"
              name="select_type"
              value={false}
              onChange={e => this.changeRadio(false)}
            />
            <Label>
              <h4>
                <Badge color="info">Single</Badge>
              </h4>
            </Label>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col md={{ size: 6, offset: 3 }}>
                <Select
                  options={this.state.options1}
                  components={makeAnimated()}
                  onChange={this.changeSelect}
                  isMulti={this.state.isMulti}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col md={{ offset: 3 }}>
                <Label>
                  <h4>
                    <Badge color="dark">Options Selected</Badge>
                  </h4>
                </Label>
                <ListGroup>
                  {this.state.displayList === [] ? (
                    <ListGroupItem color="info">Null</ListGroupItem>
                  ) : (
                    this.state.displayList.map(u => {
                      return <ListGroupItem color="info">{u.label}</ListGroupItem>;
                    })
                  )}
                </ListGroup>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
