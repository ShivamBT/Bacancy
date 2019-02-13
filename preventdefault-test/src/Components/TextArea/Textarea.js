import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Badge
} from "reactstrap";
import PropTypes from 'prop-types';
import {
  FaAddressCard
} from 'react-icons/fa';

export const Textarea = (props) => {
  return (
    <div >
      <InputGroup >
        <InputGroupAddon addonType="prepend" >
          <h4 >
            <Badge color="secondary" >
              {props.label}
            </Badge>
          </h4>
        </InputGroupAddon>
        
        <textarea
          rows="4"
          cols="30"
          name={props.name}
          onChange={props.onChange} 
        />
      </InputGroup>
    </div>
  );
};

Textarea.defaultProps = {
  label: "Address",
  name: "address"
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}