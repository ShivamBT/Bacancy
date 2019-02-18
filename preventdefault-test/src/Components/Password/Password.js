import React from 'react';
import { InputGroup, InputGroupAddon, Input, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { invalidMessage } from ".././Validation/Validation";
export const Password = (props) =>
{
  

   return (
      <div>
         <InputGroup>
            <InputGroupAddon addonType="prepend">
               <h4>
                  <Badge color="secondary">
                     <div>
                        {props.label}
                     </div>
                  </Badge>
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
            {<div><h5><Badge color="danger">{invalidMessage(props.name,props.value,props.valid)}</Badge></h5></div>}
         </InputGroup>
      
      </div>
   );
}

Password.propTypes = {
   label:PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   invalid: PropTypes.bool.isRequired,
   valid:PropTypes.bool.isRequired,
   onChange: PropTypes.func.isRequired,
   onBlur:PropTypes.func.isRequired
}

Password.defaultProps = {
   label:"Password-Box",
   type: "password",
   name: "password-field",
   placeholder: "Enter Password",
   value:"hello@123",
   invalid: false,
   valid:true
}