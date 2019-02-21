import React from 'react';
import { InputGroup, InputGroupAddon, CustomInput, Badge } from 'reactstrap';
import "./Radio.css";
import PropTypes from 'prop-types';

export const Radio = (props) =>
{
  return (
    <div>
      <div>{props.valid ? null : <div><h5><Badge color="danger">Select One</Badge></h5></div>}</div>
      <div className="container">
        {props.array.map(u => {
          return (
            <div key={u.id}>
              <InputGroup>
                <CustomInput
                  id={u.id}
                  type="radio"
                  name={u.name}
                  value={u.label}
                  invalid={!props.valid}
                  onChange={props.onChange}
                />
                <InputGroupAddon addonType="append">
                  <h5>
                    <Badge color="secondary">
                      {u.label}
                    </Badge>
                  </h5>
                </InputGroupAddon>
              </InputGroup>
            </div>
          )
        })}
      </div>
    </div>
    
  );
}

Radio.propTypes = {
  array: PropTypes.array.isRequired,  //Here array should be array of objects
  valid: PropTypes.bool.isRequired,   
  onChange: PropTypes.func.isRequired
}

Radio.defaultProps = {
  array: [{ id: "4", label: "Radio-1", name: "gender" },
  { id: "5", label: "Radio-2", name: "gender" }]
}

//name here is name of array in this.state.data where values of radio are inserted