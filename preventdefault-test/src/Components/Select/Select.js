import React , {Component} from 'react';
import Select from 'react-select';

export const SelectComponent = (props) => {
    return (
        <div>
            <Select
                isMulti={props.isMulti}
                options={props.array}
                onChange={props.onChange}
            />
                
        </div>
    );
}

