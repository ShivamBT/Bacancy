import React, { Component } from 'react';

class InputField extends Component {

    validate = (e) => {
        let re = /.+/;
        switch (e.target.name) {
            case "email":
            case "login_email":
                re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                break;
            case "password":
                re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                break;
            case "firstName":
            case "lastName":
                re = /^[A-Z]*[a-z]*$/;
                break;
            default: break;
        }
        if (re.test(e.target.value)) {
            this.props.changeevent(e.target.value, false, this.props.name); // no two changeevent works
            e.target.style.border = 'lightgrey solid';
        }
        else {
            this.props.changeevent(e.target.value, true, this.props.name);
            e.target.style.border = '#ff4b4b solid';
        }
    }

    render() {
        return (
            <div>
                <input className="form" autoComplete="off"
                    style={{ background: 'white', borderWidth: '2px', border: 'lightgrey solid' }}
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value[this.props.name]}
                    placeholder={this.props.place || this.props.name /* if value is not passed of placeholder */}
                    onChange={(e) => this.validate(e)}
                    required />
                    {/* add new element for error message */}
            </div>
        );
    }
}

export default InputField;
