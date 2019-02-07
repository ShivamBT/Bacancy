import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

export const Textarea = props => {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">{props.label}</InputGroupAddon>

        <Input type="textarea" name={props.name} onChange={props.onChange} />
      </InputGroup>
    </div>
  );
};
