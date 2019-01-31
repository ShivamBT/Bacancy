import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {editData} from './apiCall';
import {postData} from './apiCall';
import {getUserData} from './apiCall';
import './Edituser.css';

class Edituser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
    };
    this.getValues = this.getValues.bind(this);
    this.editData = this.editData.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.putData=this.putData.bind(this);
  }

  componentDidMount() {
    if(Number(this.props.match.params.flag) === 1)
      this.getValues();
  }

  
  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.setState({
        first_name: '',
        last_name: '',
      });
    }
  }

  changeValue(e)
  {
    this.setState({[e.target.name]:e.target.value});
    
  }

  editData() {
    let Id=this.props.match.params.id;
    editData(Id,this.state.first_name,this.state.last_name);
    this.props.history.push("/");
  }

  getValues() {
      let m=this.props.match.params.id;

      getUserData(m)
      .then(res => {
        this.setState({ first_name: res.data.data.first_name, last_name: res.data.data.last_name, avatar: res.data.data.avatar });
        console.log(this.state);
      })
      .catch(function (error) {
        alert("Error of getValues");
      });
  }

  putData()
  {
    postData(this.state.first_name,this.state.last_name);
    this.props.history.push("/");
  }

  render() {
      if(Number(this.props.match.params.flag)==0)
      {
        return (
        <div>
          <b className='form'> Add User</b><br /><br />
          <div className='form'>
            <p> Name : </p>
            <p> <input type='text' name='first_name' value={this.state.first_name} placeholder='Enter First Name' onChange={e => this.changeValue(e)} /></p>
            <p> Job : </p>
            <p> <input type='text' name='last_name' value={this.state.last_name} placeholder='Enter Last Name' onChange={e => this.changeValue(e)} /></p>
            <p> <button className='submit'  onClick={e => this.putData()}>Submit</button>
            <button className='cancel'>Cancel</button></p>
          </div>
        </div>
      );

      }

      else if(Number(this.props.match.params.flag)==1)
      {
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
}

Edituser.propTypes = {
  match: PropTypes.object,
};

export default Edituser;

