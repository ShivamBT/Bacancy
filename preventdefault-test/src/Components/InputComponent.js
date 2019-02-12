import React  from 'react';
import { InputGroup, InputGroupAddon,Input,Badge,FormFeedback} from 'reactstrap';
import './InputComponent.css';
import PropTypes from 'prop-types';
import {FaEnvelope,FaUserAlt,FaKey,FaPhone} from 'react-icons/fa';



export const InputComponent=(props)=>
{
    return ( 
        <div>
             <InputGroup>
              
                   <InputGroupAddon addonType="prepend">
                        <h4>
                         <Badge color="secondary">
                          <div>
                            {props.type=="text" ? <div><FaUserAlt />  {props.label}</div>:null}
                            {props.type=="email" ? <div><FaEnvelope />  {props.label}</div>:null}
                            {props.type=="password" ? <div><FaKey />  {props.label}</div>:null}
                            {props.type=="number" ? <div><FaPhone />  {props.label}</div>:null}   
                            {props.type=="radio" ? <div>{props.label}</div>:null}
                           {props.type=="checkbox" ? <div>{props.label}</div>:null}                      
                          </div>
                         </Badge>
                        </h4>
                   </InputGroupAddon> 
                    
                     <Input type={props.type} invalid={props.invalid} name={props.name} value={props.value}  onChange={props.onChange} onBlur={props.onBlur}/>
                      <FormFeedback invalid>That's wrong input</FormFeedback>
                  
             </InputGroup>
         </div>
          
      );
  
}

InputComponent.propTypes={
  type:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  value:PropTypes.string,
  onChange:PropTypes.func.isRequired,
  onBlur:PropTypes.func,
  invalid:PropTypes.bool
}

InputComponent.defaultProps={
  type:"text",
  name:"input",
  invalid:false
}

