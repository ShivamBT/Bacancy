import React from 'react';
import { InputGroup, InputGroupAddon, CustomInput, Badge} from 'reactstrap';
import PropTypes from 'prop-types';

export const Radio = (props) =>
{
  return (
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
  );
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

Radio.defaultProps = {
  id: "1",
  name: "Radio-1",
  label: "Radio-1"
}

