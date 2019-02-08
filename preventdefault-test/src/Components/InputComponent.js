import React,{Component}  from 'react';
import { InputGroup, InputGroupAddon,InputGroupText,Input} from 'reactstrap';
import './InputComponent.css';

const pstyle={
    fontSize: '15px',
    color: 'red',
}

export class InputComponent extends Component
{

  
    
    render()
    {     
        
        return ( 
        <div>

            <InputGroup>
              
                   <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          {this.props.label}
                        </InputGroupText>
                     
                    </InputGroupAddon> 
                    
                   
                   
                   
                   
                    <input type={this.props.type}   name={this.props.name} value={this.props.value}  onChange={this.props.onChange} onBlur={this.props.onBlur}/>
                    
                  
                  
                   
             
              
               
                   
               </InputGroup>
         

            
        </div>
          
      );
  
    }
     
    
}
