import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Badge, Row, Col, Button } from "reactstrap";

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
          <Button color="success" onClick={props.onMaleAgeUp}>
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
      <br/>
      <Row>
        <Col md={{ offset: 3 }}>
          <h4>
            <Badge color="primary">Female Age :{props.female_age}</Badge>
          </h4>
        </Col>
        <Col>
          <Button color="success" onClick={props.onFemaleAgeUp}>
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    male_age: state.age.male_age,
    female_age: state.age.female_age
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMaleAgeUp: () => dispatch({ type: "MALE_AGE_UP" }),
    onMaleAgeDown: () => dispatch({ type: "MALE_AGE_DOWN" }),
    onFemaleAgeUp: () => dispatch({ type: "FEMALE_AGE_UP" }),
    onFemaleAgeDown: () => dispatch({ type: "FEMALE_AGE_DOWN" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
