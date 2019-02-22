import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputGroup, InputGroupAddon } from 'reactstrap';
import { Badge } from "reactstrap";


export const DatePickerComponent = (props) =>
{
    return (
        
        <div className="datePicker">
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <h4>
                        <div>
                            <Badge>
                                {props.label}
                            </Badge>
                        </div>
                        
                    </h4>
                </InputGroupAddon>

                <DatePicker
                    value={props.value}
                    dropdownMode={props.dropdownMode}
                    showYearDropdown={props.showYearDropdown}
                    scrollableYearDropdown={props.scrollableYearDropdown}
                    yearDropdownItemNumber={props.yearDropdownItemNumber}
                    onChange={props.onChange}
                    />
            </InputGroup>
        </div>
    );
}