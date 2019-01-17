import React from 'react';

const InputField = (props) => {
    return (
        <div>
            <input
                type={props.type}
                autoComplete="off"
                placeholder={props.place || props.name}
                className={props.class}
                name={props.name}
                value={props.value}
                onChange={(e)=>props.change(e.target.name,e.target.value)}
                disabled={props.disabled || false}
            />
        </div>
    );
}

export default InputField;