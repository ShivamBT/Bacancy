import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Input, InputGroup, InputGroupAddon, Badge, Row, Col } from 'reactstrap';
import AsyncSelect from 'react-select/lib/Async';
import { loadAsyncValues } from '.././ApiCall/apiCall';




export const SelectComponent = (props) => {
    return (
        <div>
            <br />
            <br />
            <Row>
                <Col md="1">
                    <h4>
                        <Badge color="secondary">
                            City
                            </Badge>
                    </h4>

                </Col>

                <Col md="11">
                    <Select
                        id="select"
                        name={props.name}
                        components={makeAnimated()}
                        isMulti={props.isMulti}
                        options={props.cities}
                        onChange={props.onChange}
                    />
                </Col>
            </Row>

            <br />
            <h4>
                <Badge color="secondary">
                    Overseas City
                    </Badge>
            </h4>

            <h6>
                <AsyncSelect
                    id="asyncSelect"
                    components={makeAnimated()}
                    isMulti={props.isMulti}
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadAsyncValues}
                    onChange={props.onChange}
                />
            </h6>
        </div>
    );

}

















