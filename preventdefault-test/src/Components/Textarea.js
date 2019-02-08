import React from "react";
import { InputGroup, InputGroupAddon,Badge } from "reactstrap";

export const Textarea = (props) => {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
        <h4>
        <Badge color="secondary">
        {props.label}
        </Badge>
        </h4>
        
        
        </InputGroupAddon>

        <input type="textarea" name={props.name} onChange={props.onChange} />
      </InputGroup>
    </div>
  );
};
