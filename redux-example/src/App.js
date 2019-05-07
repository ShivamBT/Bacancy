import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Badge, Row, Col, Button } from "reactstrap";
import { onMaleAgeUp,onMaleAgeDown,onFemaleAgeUp,onFemaleAgeDown } from "./Actions/Actions";

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
      <br/>
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    male_age: state.age.male_age,
    female_age: state.age.female_age
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


const mapDispatchToProps =  {    //mapDispatchToProps in Object format
  onMaleAgeUp,
  onMaleAgeDown,
  onFemaleAgeUp,
  onFemaleAgeDown
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
