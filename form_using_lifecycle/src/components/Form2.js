import React, { Component } from 'react';
import InputField from './InputField';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';

class Form2 extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            gender: '',
            Ahmedabad: false,
            NewYork: false,
            London: false
        }
        console.log("Form2 Constructor");
    }
    componentWillReceiveProps(props) {
        console.log('Form2 willreceiveprops',props.value['name'])
        if (this.props !== props) { // change only if props changes
            // this.setState({
            //     name: props.value['name'],
            //     gender: props.value['gender'],
            //     Ahmedabad: props.value['Ahmedabad'],
            //     NewYork: props.value['NewYork'],
            //     London: props.value['London']
            // }, () => { console.log(this.state) }); // callback should be function, not statement/expr.
        }
    }
    componentWillMount() {
        console.log("Form2 componentWillMount");
    }
    componentDidMount(){
        console.log("Form2 componentDidMount");
    }
    componentWillUpdate(nextProps, nextState){
        //dont use setState here
        console.log("Form2 componentWillUpdate",nextProps.value['name']);
    }
    componentDidUpdate(prevProps, prevState,snapshot){
        console.log("Form2 componentDidUpdate", prevProps.value['name']);
    }
    componentWillUnmount(){
        console.log("Form2 componentWillUnmount");
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Form2 shouldComponentUpdate',nextProps.value['name'])
        return true;
    }
    render() {
        console.log("Form2 render");
        return (
            <div>
                <fieldset>
                    <legend><strong><p>You have entered following details.</p></strong></legend>
                    <InputField
                        name="name"
                        value={this.state.name}
                        class="input"
                        type="text"
                        place="Enter Name"
                        disabled="disabled"
                    />
                    <RadioComponent
                        name="gender"
                        value={this.state.gender}
                        disabled="disabled"
                    />
                    <SelectComponent
                        name="city"
                        val={this.state}
                        disabled="disabled"
                    />


                </fieldset>
            </div>
        );
    }
}

export default Form2;