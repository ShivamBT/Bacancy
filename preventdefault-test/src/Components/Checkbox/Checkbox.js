import React from 'react';
import { InputGroup, InputGroupAddon,Badge,CustomInput,Row} from 'reactstrap';


export const Checkbox=(props)=>
{
    
     return(
       
           <div className="container">
           {console.log("array is:",props.array)}
            { props.array.map(u =>
            {
              return(
                <div key={u.id}>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <h5>
                    <Badge color="secondary">
                      {u.label}
                    </Badge>
                  </h5>
                </InputGroupAddon>
              <CustomInput id={u.id} type="checkbox" name="like" value={u.label} onChange={props.onChange} />
              </InputGroup>
              

             </div> 
              )
             
            })} 
           </div>
      );
   

}

