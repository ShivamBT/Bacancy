import React, { Component } from 'react';
import InputField from './InputField';

class SignIn extends Component {

    doSignIn(e) {
        e.preventDefault();
        this.props.setValues('signin', '');
    }

    render() {
        return (
            <div>
                <form>
                    <p
                        className="heading">Sign In</p>
                    <InputField
                        name="login_email"
                        type="email"
                        place="Enter Email"
                        value={this.props.passState}
                        changeevent={this.props.setValues} />

                    <InputField
                        name="login_pass"
                        type="password"
                        place="Enter Password"
                        value={this.props.passState}
                        changeevent={this.props.setValues} />

                    <input
                        style={{ width: '100%', color: 'white', background: 'rgb(144, 52, 183)', marginTop: '175px' }}
                        className="form"
                        value={"Sign In"}
                        type="submit"
                        onClick={e => this.doSignIn(e)} />
                </form>
            </div>
        );
    }
}

export default SignIn;