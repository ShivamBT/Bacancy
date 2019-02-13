import React, {Component} from 'react';
import {InputGroup,InputGroupAddon,Input,Badge,FormFeedback} from 'reactstrap';
import './InputComponent.css';
import PropTypes from 'prop-types';

import {Badge5,Badge6,Badge10} from "../UI Components/Badges";


export class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid_name: true,
      valid_email: true,
      valid_number: true
    }

    this.validate = this.validate.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateNumber = this.validateNumber.bind(this);

  }

  validate(e) {
    let x = e.target.name;
    if (x === "name") {
      this.validateName(e);
    }
    else if (x === "email") {
      this.validateEmail(e);
    }
    else if (x === "phone_number") {
      this.validateNumber(e);
    }
  }

  validateName = (e) => {
    let x = e.target.value;
    this.setState({
      valid_name: false
    });
    let regex = /^[a-zA-Z ]{2,30}$/.test(x);
    this.setState({
      valid_name: regex
    });
    console.log("regex is: ", regex);
  }


  validateEmail = (e) => {
    let x = e.target.value;
    this.setState({
      valid_email: false
    });
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x);
    this.setState({
      valid_email: regex
    });
    console.log("regex is: ", regex);
  }

  validateNumber = (e) => {
    let x = e.target.value;
    this.setState({
      valid_number: false
    });
    let regex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(x);
    this.setState({
      valid_number: regex
    });
    console.log("regex is: ", regex);
  }




  render() {
    return (
      <div >
        <InputGroup >
          <InputGroupAddon addonType="prepend" >
            <h4 >
              <Badge color="secondary" >
                <div >
                  {this.props.label}
                </div> </Badge>
            </h4>
          </InputGroupAddon> 

          <Input
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value = {this.props.value}
            onChange={this.props.onChange}
            onBlur={e => this.validate(e)}
          />
          
          {this.state.valid_name ? null : <div> <Badge5 /> </div>}
          {this.state.valid_email ? null : <div> <Badge6 /> </div>}
          {this.state.valid_number ? null : <div> <Badge10 /> </div>}
        </InputGroup>
      </div>
    );
  }
}

          // InputComponent.propTypes={
          //   type:PropTypes.string.isRequired,
          //   name:PropTypes.string.isRequired,
          //   value:PropTypes.string,
          //   onChange:PropTypes.func.isRequired,
          //   onBlur:PropTypes.func,
          //   invalid:PropTypes.bool
          // }

          // InputComponent.defaultProps={
          //   type:"text",
          //   name:"input",
          //   invalid:false
          // }