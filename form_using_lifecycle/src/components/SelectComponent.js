import React from 'react';

const SelectComponent = (props) => (
    <div onChange={(event) => {
        console.log(props)
        if (props.change)
            props.change(event.target.value, event.target.checked);
    }}>
        <label>
            <input
                type="checkbox"
                value="Ahmedabad"
                name={props.name}
                checked={props.val['Ahmedabad'] || null} // if props.city is undefined then null. Undefined in form1.
                // error cannot access property from props.val checked={props.val['Ahmedabad'] || false}
                disabled={props.disabled || false}
            /> Ahmedabad</label>
        <label>
            <input
                type="checkbox"
                value="NewYork"
                name={props.name}
                checked={props.val['NewYork'] || null}
                // error cannot access property from props.val
                disabled={props.disabled || false}
            /> New York</label>
        <label>
            <input
                type="checkbox"
                value="London"
                name={props.name}
                checked={props.val['London'] || null}
                // error cannot access property from props.val 
                disabled={props.disabled || false}
            /> London</label>
    </div>
);


export default SelectComponent;