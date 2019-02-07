import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

import { getRecord, updateRecord, addUser } from './apiCall';

import '../css/NewUser.css';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: {
        first_name: '',
        last_name: '',
        avatar: '',
      },
      id: 0,
      loading: false
    };
  }

  componentWillReceiveProps(){
    this.setState({
      userList: {
        first_name: "",
        last_name: "",
        avatar: "",
      
      }, 
        id: 0, 
    });
  }

  async componentDidMount() {
    let uId = Number(this.props.match.params.id);
    await this.setState({ id: uId });
    if (this.state.id) {
      let res = await getRecord(this.state.id);      
      this.setState({
        userList: res.data.data,
      });      
    }    
  }

  async updateRecord() {
    const{ first_name,last_name}=this.state.userList;
    this.setState({ loading: true });
    if (this.state.id) {
      await updateRecord(this.props.match.params.id, first_name,last_name);
      this.props.history.push("/App");
    }
    else {
      await addUser(first_name,last_name);
      this.setState({ loading: false });
      this.props.history.push("/App");
    }
  }

  onChange(value,name){
    const obj={...this.state.userList}
    obj[name]=value;
    this.setState({userList:obj});
  }

  cancel() {
    this.props.history.push("/App");
  }

  render() {
    const{ first_name,last_name,avatar}=this.state.userList;
    const{id}=this.state;
    return (
      <div className='main'>
        <Header />
        <div className="add_user">{(id) ? "Edit" : "Add"} User</div>
        <p>Name:</p>
        <input
          onChange={(e) => this.onChange(e.target.value,e.target.name)}
          type='text'
          name='first_name'
          value={first_name}
          placeholder='Enter First name' />
        <p>Job:</p>
        <input
          onChange={(e) => this.onChange(e.target.value,e.target.name)}
          value={last_name}
          type='text'
          name='last_name'
          placeholder='Enter Job' />

        {(id && avatar) ? <div>
          <p>Avatar:</p>
          <img
            src={avatar}
            alt={first_name} /> </div>
          :
          <div></div>
        }
        <button className="buttonSub" onClick={() => this.updateRecord()} >
          {(this.state.loading) ? "Please wait..." : "Submit"} </button>
        <button className="buttonCan" onClick={e => this.cancel()} >Cancel</button>
      </div>
    );
  }
}

EditUser.propTypes = {
  match: PropTypes.object,
};

export default EditUser;
