import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import {editData} from './apiCall';

class Edituser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
    };
    this.getData = this.getData.bind(this);
    this.editData = this.editData.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  changeValue(e)
  {
    this.setState({[e.target.name]:e.target.value});
    
  }

  editData() {
    let Id=this.props.match.params.id;
    editData(Id,this.state.first_name,this.state.last_name);
  }

  getData() {
    Axios.get(`https://reqres.in/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ first_name: res.data.data.first_name, last_name: res.data.data.last_name, avatar: res.data.data.avatar });
        console.log(this.state);
      })
      .catch(function (error) {
        alert("Error!");
      });
  }

  render() {
    return (
      <div>
        <b className='form'> Edit User</b><br /><br />
        <div className='form'>
          <p> Name : </p>
          <p> <input type='text' name='first_name' value={this.state.first_name} placeholder='Enter First Name' onChange={e => this.changeValue(e)} /></p>
          <p> Job : </p>
          <p> <input type='text' name='last_name' value={this.state.last_name} placeholder='Enter Last Name' onChange={e => this.changeValue(e)} /></p>
          <p>Avatar : </p>
          <p><img src={this.state.avatar} alt="Profile" width="90px" height="90px" /></p>
          <p>
            <button className='submit' onClick={this.editData}>Edit</button>
            <button className='cancel'>Cancel</button>
          </p>
        </div>
      </div>
    );
  }
}

Edituser.propTypes = {
  match: PropTypes.object,
};

export default Edituser;