import React , {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Input, InputGroup, InputGroupAddon, Badge, Row, Col } from 'reactstrap';
import axios from 'axios'; 
import AsyncSelect from 'react-select/lib/Async';

/*export class SelectComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            state:null,
            cities:[]
        }
        this.changeValue = this.changeValue.bind(this);
        this.loadCities = this.loadCities.bind(this);
        this.loadAsyncValues = this.loadAsyncValues.bind(this);
    }


     changeValue(e)
    {
        console.log("changevalue called");
        this.setState({state:e.target.value });
    }

    async loadCities(e)
    {
        if (this.state.state !== "")
        {
            let array = [];
            let cityJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${this.state.state}&country=IN&maxRows=10&username=Shivam1911`);
            for (let i = 0; i < 10; i++) {
                array[i] = { label: cityJSON.data.geonames[i].name, value: i + 1 }
            }
            this.setState({ cities: array });
            console.log("Search term is :", this.state.state);
            console.log("cities array is :", this.state.cities);
            console.log("Cities are: ", cityJSON.data.geonames);
        }
        
    }

    async loadAsyncValues(name)
    {
        console.log("async select called");
        let array = [];
        let asyncJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${name}&maxRows=20&username=Shivam1911`);
        console.log("AsyncJson :", asyncJSON);
        for (let i = 0; i < 20; i++)
        {
            array[i] = { label: `${asyncJSON.data.geonames[i].name} ,${asyncJSON.data.geonames[i].adminName1}, ${asyncJSON.data.geonames[i].countryName}`, value: i + 1 }
        }
        console.log("Array is : ", array);
        return array;
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
                            id="1"
                            components={makeAnimated()}
                            isMulti={this.props.isMulti}
                            options={this.state.cities}
                            onChange={this.props.onChange}
                        />
                    </Col>
                </Row>
                
                <br/>
               
                   
                        <h4>
                            <Badge color="secondary">
                                Overseas City
                            </Badge>
                        </h4>
                   
                   
                        <h4>
                        <AsyncSelect
                            id="2"
                            cacheOptions
                            defaultOptions={false}
                            loadOptions={this.loadAsyncValues} />
                        </h4>
                    
               
                                               
              
            </div>
        );

    }
    
}*/



export const SelectComponent = (props) =>
{
    const [state, changeState] = useState("");
    const [cities, changeCity] = useState([]);

    const changeValue = (e) =>
    {
        console.log("changevalue called");
        changeState({ state: e.target.value });
    }

    /*async function loadCities(e)
    {
        if (state !== "")
        {
            let array = [];
            let cityJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${this.state.state}&country=IN&maxRows=10&username=Shivam1911`);
            for (let i = 0; i < 10; i++)
            {
                array[i] = { label: cityJSON.data.geonames[i].name, value: i + 1 }
            }

            changeCity({ cities: array });
            console.log("Search term is :", state);
            console.log("cities array is :", cities);
            console.log("Cities are: ", cityJSON.data.geonames);
        }

    }

    async function loadAsyncValues(name)
    {
        console.log("async select called");
        let array = [];
        let asyncJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${name}&maxRows=20&username=Shivam1911`);
        console.log("AsyncJson :", asyncJSON);
        for (let i = 0; i < 20; i++)
        {
            array[i] = { label: `${asyncJSON.data.geonames[i].name} ,${asyncJSON.data.geonames[i].adminName1}, ${asyncJSON.data.geonames[i].countryName}`, value: i + 1 }
        }
        console.log("Array is : ", array);
        return array;
    }*/

    return (
        <div>
            <br />
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
                    onChange={e => changeValue(e)}
                 //   onBlur={e => loadCities(e)}
                />
            </InputGroup>

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
                        id="1"
                        components={makeAnimated()}
                        isMulti={props.isMulti}
                        options={state.cities}
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


            <h4>
                <AsyncSelect
                    id="2"
                    cacheOptions
                    defaultOptions={false}
                   // loadOptions={loadAsyncValues}
                />
            </h4>




        </div>
    );




}
      




    
    

        



