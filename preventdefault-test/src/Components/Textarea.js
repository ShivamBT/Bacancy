import React from "react";
import { InputGroup, InputGroupAddon,Badge } from "reactstrap";

export const Textarea = (props) => {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
        <Badge color="secondary">
        {props.label}
        </Badge>
        
        </InputGroupAddon>

        <input type="textarea" name={props.name} onChange={props.onChange} />
      </InputGroup>
    </div>
  );
};
