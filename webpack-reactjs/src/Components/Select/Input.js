import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, Badge, Row, Col } from 'reactstrap';


export const InputSelect = (props) =>
{
    return (
        <div>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <h4>
                        <Badge color="secondary">
                            State
                        </Badge>
                    </h4>

                </InputGroupAddon>
                <Input
                    type={props.text}
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </InputGroup>


        </div>
    );
}