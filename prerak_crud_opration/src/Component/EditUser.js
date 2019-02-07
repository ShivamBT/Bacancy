import React, { Component } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import './NewUser.css';
import axios from 'axios';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: {
        first_name: '',
        last_name: '',
        avatar: '',
        id: '',
      },
      successUpdate: false,
      dataFetched: false,
    };
  }

  componentDidMount() {
    this.getRecord();
    this.setState({ loading: false });
  }

  getRecord = () => {
    axios.get(`https://reqres.in/api/users/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          userList: res.data.data,
          dataFetched: 'true',
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  updateRecord = (e) => {
    e.preventDefault();
    axios.put(`https://reqres.in/api/users/${this.props.match.params.id}`,
      {
        name: this.state.userList.first_name,
        job: this.state.userList.last_name,
      })
      .then((res) => {
        console.log('[Edit Record] Data Updated.', res);
      }).catch((error) => {
        console.log(error);
      });
  }

  onNameChange = (e) => {
    this.setState({ userList: { ...this.state.userList, first_name: e.target.value } });
  }

  onJobChange = (e) => {
    this.setState({ userList: { ...this.state.userList, last_name: e.target.value } });
  }

  render() {
    return (
      <div className='main'>
        <h2>User CRUD Operation</h2>
        <NavLink exact to='/App' className="Navlink" activeClassName="active">Record List</NavLink> |
        <NavLink to='/App/NewUser' className="Navlink" activeClassName="active">Add Record</NavLink>

        <div className="add_user">Edit User</div>

        <p>Name:</p>
        <input
          onChange={this.onNameChange}
          type='text'
          value={this.state.userList.first_name}
          placeholder='Enter First name' /> <br />

        <p>Job:</p>
        <input
          onChange={this.onJobChange}
          value={this.state.userList.last_name}
          type='text'
          placeholder='Enter Job' /> <br />

        <p>Avatar:</p> <br />
        <img
          src={this.state.userList.avatar}
          alt={this.state.userList.first_name} /> <br />

        <button className="buttonSub" onClick={e => this.updateRecord(e)} > Submit </button>
        <button className="buttonCan" >Cancel</button>

      </div>

    );
  }
}
EditUser.propTypes = {
  match: PropTypes.object,
};

export default EditUser;
