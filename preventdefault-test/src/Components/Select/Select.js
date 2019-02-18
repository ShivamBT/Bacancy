import React , {Component} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Input, InputGroup, InputGroupAddon, Badge, Row, Col } from 'reactstrap';
import axios from 'axios'; 
import AsyncSelect from 'react-select/lib/Async';

export class SelectComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            state:'',
            cities:[]
        }
        this.changeValue = this.changeValue.bind(this);
        this.loadCities = this.loadCities.bind(this);
    }

    changeValue(e)
    {
        this.setState({state:e.target.value });
    }

    async loadCities(e)
    {
        if (this.state.state = "")
        {
            return;
            
        }

        else if(this.state.state!=="")
        {
            let array = [];
            let cityJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${this.state.state}&country=IN&maxRows=10&username=Shivam1911`);
            for (let i = 0; i < 10; i++)
            {
                array[i] = { label: cityJSON.data.geonames[i].name, value: i + 1 }
            }
            this.setState({ cities: array });
            console.log("Search term is :", this.state.state);
            console.log("cities array is :", this.state.cities);
            console.log("Cities are: ", cityJSON.data.geonames);

            
        }
    }

    render()
    {
        return (
            <div>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <h4>
                            <Badge color="secondary">
                                State
                            </Badge>
                        </h4>
                       
                    </InputGroupAddon>

                    <Input
                        name="state"
                        type="text"
                        placeholder="Enter the name of state here"
                        onChange={e => this.changeValue(e)}
                        onBlur={e => this.loadCities(e)}
                    />
                </InputGroup>

                <br/>
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
                            components={makeAnimated()}
                            isMulti={this.props.isMulti}
                            options={this.state.cities}
                            onChange={this.props.onChange}
                        />
                    </Col>
                </Row>
                                               
              
            </div>
        );

    }
    
}

