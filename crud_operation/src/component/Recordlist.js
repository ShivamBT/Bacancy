import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recordlist.css';
import {getData} from './apiCall';
import {editData} from './apiCall';
import {deleteRecord} from './apiCall';

class Recordlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      load: false,
      current_page: 1,
      pages: [],
    };
    this.pagination = this.pagination.bind(this);
    this.onClick = this.onClick.bind(this);
    this.deleteUser=this.deleteUser.bind(this);

  }

  onClick(e) {
    this.setState({ current_page: e.target.value},
       () => {
        getData(this.state.current_page)
        .then(res => {
          console.log('res', res)
          this.setState({ users: res.data.data || [], load: false, pages: res.data })
        })

    });
  }

 
  
  pagination() {
    let m=this.state.pages.total_pages; 
    var i=1;
    let page= Array(m).fill(0).map((m,i) => {
      return(
        <div className='paging' key={i}>
          <button className={(Number(this.state.current_page) === i+1) ? "btn active" : "btn"} value={i+1} onClick={(e) => this.onClick(e)}>{i+1}</button>
        </div>
      )
     } 
    );
    return (page);
  }

  deleteUser(id)
  {
    console.log("Deletion called");
    if(window.confirm("Are you sure you want to delete this user?"))
    {
      deleteRecord(id)
      .then(res => 
        {
          console.log("User Deleted: ", res);
        }
      )
    }
  }

  componentDidMount() {
    this.setState({ load: true });
    getData(this.state.current_page)
    .then(res => {
      console.log('res', res)
      this.setState({ users: res.data.data || [], load: false, pages: res.data })
    })
   /*.catch(function (Error){
      console.log("Return error");
    })*/
  }



  render() {
    if (this.state.load) {
      return (<b className='loading'>Please wait ...</b>);
    }

    return (
      <div className="App1">
        <div className='load'>
          <div>
            <div className="tableContent bottomB leftB rightB ">
              <div className="headerData topB headingBottom">
                <div className="table-Data rightB"> Firstname </div>
                <div className="table-Data rightB"> Lastname </div>
                <div className="table-Data rightB"> Avtar </div>
                <div className="table-Data"> Action </div>
              </div>
              {this.state.users.map((u, i) =>
                <div key={i}>
                  <div className="topB">
                    <div className="table-Data rightB"> {u.first_name} </div>
                    <div className="table-Data rightB"> {u.last_name} </div>
                    <div className="table-Data rightB"> <img src={u.avatar} alt="Profile" className='image' /> </div>
                    <div className="table-Data">
                      <NavLink to={`/edit/${i + 1}/1`} className='link1' >Edit</NavLink>
                      &nbsp;|&nbsp;
                      <NavLink to={`/`} className='link1' onClick={() => this.deleteUser(u.id)} >Delete</NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {this.pagination()}
          </div>
        </div>
      </div>
    );
  }
}
export default Recordlist;
