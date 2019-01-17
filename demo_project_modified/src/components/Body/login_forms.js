import React, { Component } from 'react';
import './login_forms.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // ES6

            name: '',
            email: '',
            password: '',
            mobile: '',
            invalid: false,
            invalidMob: false,
            invalidPass: false,
            registered: false,
            displayDiv: false
        };
        this.doSignUp = this.doSignUp.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.mobileValidation = this.mobileValidation.bind(this);
        this.passValidation = this.passValidation.bind(this);
    }

    doSignUp = (e) => {
        //debugger // to debug javascript
        e.preventDefault(); // to prevent reloading the page
        if (this.state.name != '' && this.state.password != '' && this.state.email != '' && this.state.invalid == false && this.state.invalidMob == false && this.state.invalidPass == false) {
            this.props.getValues(this.state.name,this.state.email,this.state.password,this.state.mobile);
            this.setState({ registered: true });
            alert("Hi " + this.state.name + ", you registered successfully.");
            this.setState({ displayDiv: true });
        }
        else {
            this.setState({ displayDiv: true });
        }
    };

    emailValidation(e) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(e.target.value)) {
            this.setState({ email: e.target.value, invalid: false });
        }
        else {
            this.setState({ invalid: true });
        }
    }

    mobileValidation(e) {
        if (/^\d{10}$/.test(e.target.value)) {
            this.setState({ mobile: e.target.value, invalidMob: false });
        }
        else {
            this.setState({ invalidMob: true });
        }
    }

    passValidation(e) {
        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value)) {
            this.setState({ password: e.target.value, invalidPass: false });
        }
        else {
            this.setState({ invalidPass: true });
        }
    }

    render() {

        let display_sum = { padding: '3.7%', paddingRight: '8.4%', paddingLeft: '8.4%', textAlign: 'center', border: '1px solid lightgrey' };

        return (
            <div>
                <form onSubmit={this.doSignUp} >
                    <p style={{
                        color: 'grey',
                        fontSize: '25px',
                        width: '100%',
                        textAlign: 'center'
                    }}>Sign Up</p> {/*css modules*/}

                    <input className="form" autoComplete="off" id="name" type="text" style={{ background: '#ececec', borderWidth: '2px', border: 'ff4b4b' }} placeholder="Enter Name" onBlur={e => this.setState({ name: e.target.value })} required /><br />

                    <input className="form" autoComplete="off" onChange={this.emailValidation} id="email" type="email" placeholder="Enter Email" required style={{ border: this.state.invalid ? "2px solid #ff4b4b" : '2px solid lightgrey' }} /><br />

                    <input className="form" onChange={this.passValidation} id="password" type="password" style={{ background: '#ececec', borderWidth: '0', border: this.state.invalidPass ? "2px solid #ff4b4b" : '2px solid lightgrey' }} placeholder="Enter Password" required /><br />

                    <input className="form" autoComplete="off" style={{ border: this.state.invalidMob ? "2px solid #ff4b4b" : '2px solid lightgrey' }} onChange={this.mobileValidation} id="Mobile" type="text" placeholder="Enter Mobile no." maxlength='10' required /><br /><br />
                    <div style={{ height: '71px', visibility: this.state.displayDiv ? 'visible' : 'hidden' }}>
                        <label style={{ color: 'red' }}>{this.state.invalid ? "• invalid email id. " : ''}</label>
                        <label style={{ color: 'red' }}>{this.state.invalidMob ? "• invalid mobile no. " : ''}</label>
                        <label style={{ color: 'red' }}>{this.state.invalidPass ? "• invalid password " : ''}</label>
                    </div><br /><br />

                    <input className="form" id="signup" style={{ width: '100%', color: 'white', background: 'rgb(144, 52, 183)', background: this.state.registered ? 'rgb(183, 183, 183)' : 'rgb(144, 52, 183)' }} disabled={this.state.registered ? true : false} value="Register" type="submit" />
                </form>
            </div>
        );
    }
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.doSignIn = this.doSignIn.bind(this);
        this.state = {
            email: '',
            pass: '',
            invalid: false,
            displayDiv: false
        }
        this.emailValidation = this.emailValidation.bind(this);
    }

    emailValidation(e) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(e.target.value)) {
            this.setState({ email: e.target.value, invalid: false });
        }
        else {
            this.setState({ invalid: true });
        }
    }

    doSignIn = (e) => {
        e.preventDefault(); // to prevent reloading the page
        let data = this.props.setData;
        if (data.email == "" || data.password == "") {
            if (!this.state.invalid) { alert('Sign Up and try again.'); }
            else {
                this.setState({ displayDiv: true });
            }

        }
        else {
            console.log(data);
            if (this.state.email === data.email && this.state.pass === data.password && this.state.invalid == false) {
                alert('Login Succeed.');
                this.setState({ displayDiv: false });
            }
            else {
                this.setState({ displayDiv: true });
                alert('Login Failed. Do register or enter correct details.');
            }
        }
        // debugger
    };

    render() {
        return (
            <div>
                <form onSubmit={this.doSignIn} >
                    <p style={{
                        color: 'grey',
                        fontSize: '25px',
                        width: '100%',
                        textAlign: 'center'
                    }}>Sign In</p> {/*css modules*/}
                    <input className="form" id="login_email" autoComplete="off" type="email" style={{ background: '#ececec', border: this.state.invalid ? "2px solid #ff4b4b" : '2px solid lightgrey' }} onChange={this.emailValidation} placeholder="Enter Email" required /><br />

                    <input className="form" id="login_pass" type="password" onBlur={e => this.setState({ pass: e.target.value })} placeholder="Enter Password" required /><br /><br />

                    <div style={{ height: '100px', visibility: this.state.displayDiv ? 'visible' : 'hidden' }}>
                        <label style={{ color: 'red' }}>{this.state.invalid ? "• invalid email id. " : ''}</label>
                    </div><br /><br />

                    <input className="form" style={{ width: '100%', color: 'white', background: 'rgb(144, 52, 183)', marginTop: '60px' }} value="Sign In" type="submit" />
                </form>
            </div>
        );
    }
}

class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            count: 0
        }
        this.getValue = this.getValue.bind(this);
    }

    getValue(name,email,password,mobile) {
        let newUser = {
            name: name,
            password: password,
            email: email,
            mobile: mobile
        }
        this.setState({
            users: this.state.users.concat(newUser),
            count: this.state.count + 1
        });
    }
    render() {
        return (
            <div className="cntr">
                <div className="block" style={{ float: 'left' }}>
                    <SignUp getValues={(name,email,password,mobile) => this.getValue(name,email,password,mobile)} />
                </div>

                <div className="block" style={{ float: 'right' }}>
                    <SignIn setData={this.state} />
                </div>
                {console.log(this.state)}
            </div>
        );
    }

}

export default Parent;