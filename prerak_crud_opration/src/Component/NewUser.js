import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import './NewUser.css';
import axios from 'axios';
class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      first_name:'',
      last_name:'',
      submitted:false,
      data:false
    }
  }
  onNameChange= (e) =>{
    this.setState({first_name: e.target.value});
  }
  onJobChange=(e) =>{
    this.setState({last_name:e.target.value})
  }
  onClick=(e)=>{
    this.setState({data:true});
    axios.post('https://reqres.in/api/users', 
    {'name':this.state.first_name, 'job':this.state.last_name})
    .then(res => {
      console.log(res);
      this.setState({ submitted:'true', data:false});
    }).catch(function (error) {
      console.log(error);
      
    });

  }
   render(){
     return (
  <div className='main'>
    <h2>User CRUD Operation</h2>
    <NavLink exact to='/App' className="Navlink" activeClassName="active">Record List</NavLink> |
   <NavLink to='/App/NewUser' className="Navlink" activeClassName="active">Add Record</NavLink>

    <div>
      <div className="add_user"><b>Add User</b></div>

      <p>Name :</p>
      <input type="text" onChange={this.onNameChange} name="first_name" placeholder="Enter First Name" />
      <p>Job :</p>     
      <input type="text" onChange={this.onJobChange} name="last_name" placeholder="Enter Last Name" />
      <br/>
      <button className="buttonSub"  onClick={(e) => this.onClick(e)} >{this.state.data? 'Please wait..' : 'Submit'} </button>
      <button className="buttonCan" >Cancel</button>

    </div>

  </div>


);
}
}

export default NewUser;