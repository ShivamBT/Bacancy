import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Parent extends Component {
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
        this.checkUserLogin = this.checkUserLogin.bind(this);
    }

    addNewUser(value, invalid, field) {
        // user this way : pass isSubmit parameter
        // if(!isSubmit){
        //     const {firstName, lastName} = this.state.current;
        // }
        if (value === 'submit' &&
            this.state.current['firstName'] !== "" && !this.state.current['invalid_firstNam6e'] &&
            this.state.current['lastName'] !== "" && !this.state.current['invalid_lastName'] &&
            this.state.current['email'] !== "" && !this.state.current['invalid_email'] &&
            this.state.current['password'] !== "" && !this.state.current['invalid_password']
        ) {
            let obj = this.state.signup;
            let existingUser = obj.filter((person) => {
                if (person.email === this.state.current['email']) {
                    return 1;
                }
                else { return 0; }
            }); // used filter using if else, otherwise "person is not defined" error.
            if (existingUser.length !== 0) {
                return alert('Email id is already taken.')
            }
            else {
                // let objs = this.state.signup;
                this.setState(state => ({
                    signup: [...state.signup, state.current], current: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                    }
                }));
                alert("Registered Successfully.");
                //current object is as it is
            }
        }
        else if (value !== 'submit') {
            let obj = { ...this.state.current };
            // dont directly assign current to obj because it create reference which changes both when we change a single
            obj[field] = value;
            let invalid_name = "invalid_" + field;
            obj[invalid_name] = invalid;
            this.setState({ current: obj });
        }
        else {
            alert("Empty/Invalid Fields.")
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
            <div className="cntr">
                <div className="block" style={{ float: 'left' }}>
                    {/* passed function in setState instead of object */}
                    <SignUp
                        passState={this.state.current}
                        setValues={(value, invalid, field) => this.addNewUser(value, invalid, field)
                            //pass isSubmit for submit button
                        } />
                </div>
                <div className="block" style={{ float: 'right' }}>
                    <SignIn
                        passState={this.state.signin}
                        setValues={(value, invalid, field) => this.checkUserLogin(value, invalid, field)} />
                </div>

            </div>
        );
    }
}

export default Parent;