import React from 'react';
import {InputGroup,InputGroupAddon,Input,Badge,FormFeedback} from 'reactstrap';


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
               type="password"
               name={props.name}
               placeholder={props.placeholder}
               value={props.value}
               onChange={props.onChange}
               onBlur={props.onBlur} />
                  
             </InputGroup>
         </div>
          
      );
  
}
