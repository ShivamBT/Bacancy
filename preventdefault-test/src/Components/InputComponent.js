import React  from 'react';
import { InputGroup, InputGroupAddon, Input} from 'reactstrap';


export const InputComponent =(props) =>
{
    return (
        <div>
          <InputGroup>

                 <InputGroupAddon addonType="prepend">
                     {props.label}
                  </InputGroupAddon> 
   
       
     
                 <Input type={props.type}  name={props.name} value={props.value} onChange={props.onChange} />

            </InputGroup>
          
           </div>
        
    );
}
   


