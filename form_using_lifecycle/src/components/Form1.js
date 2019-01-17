import React, { Component } from 'react';
import InputField from './InputField';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';

class Form1 extends Component {
    render() {
        return (
            <div>
                <fieldset>
                <legend><strong><p>Fill the form.</p></strong></legend>
                <form>
                    <InputField
                        class="input"
                        type="text"
                        name="name"
                        place="Enter Name"
                        value={this.props.value['name']}
                        change={this.props.change}
                    />
                    <RadioComponent
                        name="gender"
                        value={this.props.value['gender']}
                        change={this.props.change}
                    />
                    <SelectComponent
                        name="city"
                        val={this.props.value}
                        change={this.props.change}
                    />

                    <input
                        type="submit"
                        onClick={this.props.btnHandler}
                        style={{margin:'10px auto',width:'100%',display:'block'}}
                    />
                </form>
                </fieldset>
            </div>
        );
    }
}

export default Form1;