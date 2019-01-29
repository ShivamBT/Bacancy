import React, { Component } from 'react';
import './Adduser.css';
import Axios from 'axios';
import {postData} from './apiCall';
export class Adduser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
    };
    this.changeValue = this.changeValue.bind(this);
    this.putData=this.putData.bind(this);
  }

  changeValue(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
    
  }

  /*postData() {
    this.setState({wait : true});
    Axios.post('https://reqres.in/api/users', { first_name: this.state.first_name, last_name: this.state.last_name })
      .then(function (json) {
        console.log("User Added", json);
      })
      .catch(function (error) {
        alert("Error!!");
      });
  }*/

 putData(e){
    postData(this.state.first_name,this.state.last_name);
  }



  render() {
    return (
      <div>
        <b className='form'> Add User</b><br /><br />
        <div className='form'>
          <p> Name : </p>
          <p> <input type='text' name='first_name' value={this.state.first_name} placeholder='Enter First Name' onChange={e => this.changeValue(e)} /></p>
          <p> Job : </p>
          <p> <input type='text' name='last_name' value={this.state.last_name} placeholder='Enter Last Name' onChange={e => this.changeValue(e)} /></p>
          <p> <button className='submit'  onClick={e => this.putData()}>Submit</button>
          <button className='cancel'>cancel</button></p>
        </div>
      </div>
    );
  }
}

export default Adduser;
