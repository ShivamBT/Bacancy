import React from 'react';
import { InputGroup, InputGroupAddon, Badge, CustomInput, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export const Checkbox = (props) =>
{
  return (
    <div className="container">
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
  array: PropTypes.array.isRequired,   //Here array should be array of objects
  onChange:PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  array: [{ id: "1", label: "Value-1", name: "like" },    
  { id: "2", label: "Value-2", name: "like" },
  { id: "3", label: "Value-3", name: "like" }]
 }


//name here is name of array in this.state.data where values of checkbox are inserted