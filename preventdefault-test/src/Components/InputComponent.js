import React  from 'react';
import { InputGroup, InputGroupAddon,InputGroupText,Input,Badge} from 'reactstrap';
import './InputComponent.css';
import PropTypes from 'prop-types';



export const InputComponent=(props)=>
{

  
    
    
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
                    
                   
                   
                   
                   
                    <Input type={props.type}   name={props.name} value={props.value}  onChange={props.onChange} onBlur={props.onBlur}/>
                    
                  
                  
                   
             
              
               
                   
               </InputGroup>
         

            
        </div>
          
      );
  
}

InputComponent.propTypes={
  type:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  onBlur:PropTypes.func
}
