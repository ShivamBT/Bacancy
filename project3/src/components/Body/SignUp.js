import React, { Component } from 'react';
import './style.css';
import InputField from './InputField';

class SignUp extends Component {

    render() {
        return (
            <div>
                <form onSubmit={e=>e.preventDefault()} >
                <p className="heading">Sign Up</p>
                    <InputField id="firstName" type="text" place="Enter First Name" blurevent={this.props.getFname}/>

                    <InputField id="lastName" type="text" place="Enter Last Name" blurevent={this.props.getLname}/>

                    <InputField id="email" type="email" place="Enter Email" blurevent={this.props.getEmail}/>

                    <InputField id="password" type="password" place="Enter Password" blurevent={this.props.getPass}/>
                    
                    <input className="form" id="signup" style={{ width:'100%', color: 'white', background: 'rgb(144, 52, 183)', marginTop: '90px' }} value="Register" type="submit" />
                </form>
            </div>
        );
    }
}

export default SignUp;