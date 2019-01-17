import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignIn from './SignIn';

class SignInPage extends Component {
    constructor() {
        super();
        this.state = {
            signup: [],
            current: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            signin: {
                login_email: '',
                login_pass: '',
            }
        }
    }

    checkUserLogin(value, invalid, field) {
        if (value === 'signin' && this.state.signin['login_email'] !== "" && this.state.signin['login_pass'] !== "" && this.state.signin['invalid_login_email'] === false) {
            let obj = this.state.signup;
            let existingUser = obj.filter((person) => {
                if (person.email.toLowerCase() === this.state.signin['login_email'].toLowerCase() && person.password === this.state.signin['login_pass']) {
                    return 1;
                }
                else { return 0; }
            });
            if (existingUser.length !== 0) {
                this.setState({
                    signin: {
                        login_email: '',
                        login_pass: ''
                    }
                });
                return alert('Login Successful.');
            }
            else {
                return alert('Incorrect Email/Password.');
            }
        }
        else {
            if (value === 'signin') {
                return alert('Invalid Email');
            }
            else {
                let obj = { ...this.state.signin };
                // dont directly assign current to obj because it create reference which changes both when we change a single
                obj[field] = value;
                let invalid_name = "invalid_" + field;
                obj[invalid_name] = invalid;
                this.setState({ signin: obj });
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="banner">
                    <h1>Don't have an account? </h1><br />
                    <h2><NavLink to='./SignUp'>Register Now!</NavLink></h2>
                </div>
                <div className="cntr">
                    <div className="block" style={{ float: 'right' }}>
                        <SignIn
                            passState={this.state.signin}
                            setValues={(value, invalid, field) => this.checkUserLogin(value, invalid, field)} />
                    </div>

                </div>
            </div>
                );
            }
        }
        export default SignInPage;
