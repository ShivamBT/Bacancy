import React from 'react';
import { InputGroup, InputGroupAddon, CustomInput, Badge } from 'reactstrap';
import { Badge11 } from ".././UI Components/Badges";


export const Radio=(props)=>
{
  return (
    <div className="container">
      {console.log("array is:", props.array)}
      {props.array.map(u =>
      {
        return (
          <div key={u.id}>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <h5>
                  <Badge color="secondary">
                    {u.label}
                  </Badge>
                </h5>
              </InputGroupAddon>
              
              <CustomInput
                id={u.id}
                type="radio"
                name={u.name}
                value={u.label}
                onChange={props.onChange}
              />
               {props.valid ? null : <div><h5><Badge color="danger">Select One</Badge></h5></div>} 
            </InputGroup>
          </div>
        )
      })}
    </div>
  );
}

