import React from 'react';
import {InputGroup,InputGroupAddon,Input,Badge} from 'reactstrap';
import './InputComponent.css';
import PropTypes from 'prop-types';

export const InputComponent = (props) => {
  return (
    <div >
      <InputGroup >
          <InputGroupAddon addonType="prepend" >
            <h4 >
              <Badge color="secondary" >
                <div >
                  {props.label}
                </div> </Badge>
            </h4>
        </InputGroupAddon>
        <Input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          invalid={!props.valid}
          onChange={props.onChange}
          onBlur={props.onBlur}
          />
          
        {props.valid ? null : <div> <h5><Badge color="danger">Invalid {props.label}</Badge> </h5></div>}
        
        
      </InputGroup>
    </div>
 
  )
       
  
}

InputComponent.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired
}

InputComponent.defaultProps = {
  type: "text",
  name: "input",
  placeholder: "Name",
  value: "testinput",
  invalid: false
}

          