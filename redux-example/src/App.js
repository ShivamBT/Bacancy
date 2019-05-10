import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Badge, Row, Col, Button } from "reactstrap";
import {
  onMaleAgeUp,
  onMaleAgeDown,
  onFemaleAgeUp,
  onFemaleAgeDown,
  increaseNumber,
  fetchApiData
} from "./Actions/Actions";
import ReactTable from "react-table";
import "react-table/react-table.css";

let column = [
  {
    Header: "User Id",
    accessor: "userId"
  },
  {
    Header: "Id",
    accessor: "id"
  },
  {
    Header: "Title",
    accessor: "title"
  },
  {
    Header: "Body",
    accessor: "body"
  }
];

const App = props => {
  return (
    <div className="App">
      <h1>
        <Badge>Redux Example</Badge>
      </h1>
      <Row>
        <Col md={{ offset: 3 }}>
          <h4>
            <Badge color="primary">Male Age :{props.male_age}</Badge>
          </h4>
        </Col>
        <Col>
          <Button color="success" onClick={() => props.onMaleAgeUp(2)}>
            Age Up
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            color="danger "
            onClick={props.onMaleAgeDown}>
            Age Down
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{ offset: 3 }}>
          <h4>
            <Badge color="primary">Female Age :{props.female_age}</Badge>
          </h4>
        </Col>
        <Col>
          <Button color="success" onClick={() => props.onFemaleAgeUp(2)}>
            Age Up
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            color="danger"
            onClick={props.onFemaleAgeDown}>
            Age Down
          </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col md={{ offset: 3 }}>
          <h4>
            <Badge color="primary">Number : {props.number}</Badge>
          </h4>
        </Col>
        <Col>
          <Button color="success" onClick={props.increaseNumber}> Increase Number</Button>
          <Button color="primary" onClick={props.fetchApiData}> Fetch Api Data</Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ offset: 3 }}>
          <ReactTable
            data={props.data}
            columns={column}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    male_age: state.ag.age.male_age,
    female_age: state.ag.age.female_age,
    number: state.nu.number,
    data: state.api.data
  };
};

// const mapDispatchToProps = dispatch => {              //mapDispatchToProps in Functional Format
//   return {
//     onMaleAgeUp: (val) => dispatch({ type: "MALE_AGE_UP" , payload:val}),
//     onMaleAgeDown: () => dispatch({ type: "MALE_AGE_DOWN" }),
//     onFemaleAgeUp: (val) => dispatch({ type: "FEMALE_AGE_UP" , payload:val}),
//     onFemaleAgeDown: () => dispatch({ type: "FEMALE_AGE_DOWN" })
//   };
// };

const mapDispatchToProps = {
                                                        //mapDispatchToProps in Object format
  onMaleAgeUp,
  onMaleAgeDown,
  onFemaleAgeUp,
  onFemaleAgeDown,
  increaseNumber,
  fetchApiData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
