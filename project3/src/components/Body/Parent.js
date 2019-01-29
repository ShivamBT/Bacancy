import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Parent extends Component {
    constructor() {
        super();
        this.state = {
            signup: {
                fname: '',
                lname: '',
                password: '',
                email: '',
            },

            signin: {
                email: '',
                password: '',
            }

        }
    }

    getValueForm1(value,field) {
        switch(field)
        {
            case "fname":
            this.setState({ signup: { ...this.state.signup,fname: value}});
            break;

            case "lname":
            this.setState({ signup: { ...this.state.signup,lname: value}});
            break;

            case "email":
            this.setState({ signup: { ...this.state.signup,email: value}});
            break;

            case "password":
            this.setState({ signup : { ...this.state.signup,password:value}});
            break;

            default:break;
        }
    }

    getValueForm2(value,field) {
        switch(field)
        {
            case "email":
            this.setState({ signin: { ...this.state.signin,email: value}});
            break;

            case "password":
            this.setState({ signin : { ...this.state.signin,password:value}});
            break;

            default:break;
        }
    }

    render() {
        console.log("Signup",this.state.signup);
        console.log("Signin",this.state.signin);
        return (
            <div className="cntr">
                <div className="block" style={{ float: 'left' }}>
                    <SignUp getFname={(value) => this.getValueForm1(value, "fname")}
                        getEmail={(value) => this.getValueForm1(value, "email")}
                        getPass={(value) => this.getValueForm1(value, "password")}
                        getLname={(value) => this.getValueForm1(value, "lname")} />

                        
                </div>

                <div className="block" style={{ float: 'right' }}>
                    <SignIn
                        getEmail={(value) => this.getValueForm2(value, "email")}
                        getPass={(value) => this.getValueForm2(value, "password")}/>
                </div>  
                
            </div>
        );
    }

}

export default Parent;