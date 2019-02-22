import React from 'react';
import { Badge, Row, Col } from 'reactstrap';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import "./Select.css";



export const SelectComponent = (props) => {

   return (
       <div>
           <Row >
               <h4>
                   <Badge color="secondary" >
                       City
                    </Badge>
               </h4>
               <ReactMultiSelectCheckboxes
                   id="select"
                   name={props.name}
                   rightAligned={true}
                   isMulti={props.isMulti}
                   closeMenuOnSelect={false}
                   options={props.cities}
                   onChange={props.onChange}
               />
           </Row>

            
        </div>
    );

}

















