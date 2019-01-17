import React from 'react';

const RadioComponent = ({ name, disabled, change, value }) => ( // can also use attributes without props
    <div
        onChange={(event) => {
            change(event.target.name, event.target.value)
        }}>
        <label>
            <input
                type="radio"
                value="Male"
                name={name}
                disabled={disabled || false}
                checked={value ? value === "Male" : null}
            /> Male</label>
        <label>
            <input
                type="radio"
                value="Female"
                name={name}
                disabled={disabled || false}
                checked={value ? value === "Female" : null}                
            /> Female</label>
    </div>
);


export default RadioComponent;