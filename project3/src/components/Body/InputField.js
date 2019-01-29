import React, { Component } from 'react';

class InputField extends Component{

    render(){
    return (
        <div>
        <input className="form" autoComplete="off" id={this.props.id} type={this.props.type} style={{ background: 'white', borderWidth: '2px', border: 'ff4b4b' }} placeholder={this.props.place} onBlur={e => this.props.blurevent(e.target.value)} value={this.props.value} required />
        </div>
        );
    }
}

export default InputField;