import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recordlist.css';
import {getData} from './apiCall';

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

  }

  onClick(e) {
    this.setState({ current_page: e.target.value},
       () => {
      this.getData();
    });
  }

 

  pagination() {
    var page = [];
        for (var i = 1; i <= this.state.pages.total_pages; i++) {
      
      page.push(
        <div className='paging'>
          <button className={(Number(this.state.current_page) === i) ? "btn active" : "btn"} value={i} onClick={(e) => this.onClick(e)}>{i}</button>
        </div>
      );
    }
    return (page);
  }

  componentDidMount() {
    this.setState({ load: true });
    getData(this.state.current_page)
    .then(res => {
      console.log('res', res)
      this.setState({ users: res.data.data || [], load: false, pages: res.data })
    })
   .catch(function (Error){
      console.log("Return error");
    })
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
                      <NavLink to={`/edit/${i + 1}`} className='link1'>Edit</NavLink>
                      |
                      <NavLink to={`/delete/${i + 1}`} className='link1'>Delete</NavLink>
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