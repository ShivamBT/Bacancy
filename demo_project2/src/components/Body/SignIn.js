import React, { Component } from 'react';
import InputField from './InputField';

class SignIn extends Component {

    render() {
        return (
            <div>
                <form onSubmit={e=>e.preventDefault()} >
                    <p className="heading">Sign In</p>

                    <InputField id="login_email" type="email" place="Enter Email" blurevent={this.props.getEmail}/>

                    <InputField id="login_pass" type="password" place="Enter Password" blurevent={this.props.getPass}/>

                    <input className="form" style={{width:'100%',  color: 'white', background: 'rgb(144, 52, 183)', marginTop: '175px' }} value="Sign In" type="submit" />
                </form>
            </div>
        );
    }
}

export default SignIn;
