import React, { Component } from 'react';
import Form1 from './Form1';
import Form2 from './Form2';

class Body extends Component {
    state = {
        form1: {
            name: '',
            gender: '',
            Ahmedabad: false,
            NewYork: false,
            London: false
        },
        form2: {
            name: '',
            gender: '',
            Ahmedabad: false,
            NewYork: false,
            London: false
        },
    }
    componentDidMount() {
        console.log('Body Component did mount');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Body shouldComponentUpdate')
        return true;
    }

    submitHandler = (e) => {
        e.preventDefault();
        // this.setState(state => { state.form2 = { ...state.form1 } }); // curly braces after arrow, else unexpected result
        this.setState({ form2: {...this.state.form1} });
        // this.setState({newVal:true}); // re render only when state var is changed. deleting this wont re render if function is used inside setState.
    }
    render() {

        console.log("Body Render")
        return (
            <div>
                <Form1
                    btnHandler={this.submitHandler}
                    value={this.state.form1}
                    change={(field, value) => {this.setState({form1:{...this.state.form1,[field]:value}})}}
                />
                <br />
                <br />
                <Form2
                    value={this.state.form2}
                />
            </div>
        );
    }
}

export default Body;

