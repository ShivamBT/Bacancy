import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
     // loading: false
    }
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=2')
    .then(res => {
      console.log(res);
    this.setState({userList: res.data.data});  
    });
  }

 /* getUserData() {
    this.setState({ loading: true });
    fetch('https://reqres.in/api/users?page=2')
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log('res :::', res);

        this.setState({ userList: res.data || [], loading: false });
      });
  }*/

  render() {
    return (
      <ul>
        {this.state.userList.map((user,i)=> <li key={i}>{user.first_name}</li>)}

      </ul>
     /* <div className="App">
        <h1 className="para">Welcome to React Demo</h1>
        <button onClick={() => {
          this.getUserData();
        }}>Get Data</button>
        <br /><br />
        {this.state.loading ? <h4>Loading...</h4> : null}
        {this.state.userList.map((u, i) => {
          return <div style={{color:'black'}} key={i}>
            <b>First Name:</b> {u.first_name}<br />
            <b>Last Name:</b> {u.last_name}<br />
            <hr />
          </div>
        })}
      </div>*/
    );
  }
}

export default App;