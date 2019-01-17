import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignUp from './SignUp';

class SignUpPage extends Component {
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

    addNewUser(value, invalid, field) {
        // user this way : pass isSubmit parameter
        // if(!isSubmit){
        //     const {firstName, lastName} = this.state.current;
        // }
        if (value === 'submit' &&
            this.state.current['firstName'] !== "" && !this.state.current['invalid_firstName'] &&
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

    render() {
        return (
            <div className="container">
                <div className="banner">
                    <h1>Create your account Now!</h1><br />
                    <h2>It's free!</h2><br/>
                    <p>Already a user? <NavLink to='./SignIn'>Login Here</NavLink></p>
                </div>
                <div className="cntr">
                    <div className="block" style={{ float: 'left' }}>
                        {/* passed function in setState instead of object */}
                        <SignUp
                            passState={this.state.current}
                            setValues={(value, invalid, field) => this.addNewUser(value, invalid, field)
                                //pass isSubmit for submit button
                            } />
                    </div>
                </div>
            </div>
        );
    }
}
export default SignUpPage;
