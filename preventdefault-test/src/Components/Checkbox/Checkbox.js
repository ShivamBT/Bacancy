import React from 'react';
import { InputGroup, InputGroupAddon, Badge, CustomInput, Col } from 'reactstrap';
import PropTypes from 'prop-types';



export const Checkbox=(props)=>
{
  return (
    <div className="container">
      
      {console.log("array is:", props.array)}
       {console.log("Default Props :", Checkbox.defaultProps)}
      <Col>
        {props.array.map(u => {
          return (
           
            <div key={u.id}>

              <InputGroup>

                <CustomInput
                  id={u.id}
                  type="checkbox"
                  name={u.name}
                  value={u.label}
                  onChange={props.onChange} />

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
      </Col>
    </div>
  );


}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  id: "1",
  name: "Checkbox-1",
  label: "Checkbox-1"
}