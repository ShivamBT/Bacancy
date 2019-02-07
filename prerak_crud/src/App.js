import React, { Component } from 'react';
import Header from './Component/Header';

import { NavLink } from 'react-router-dom';
import { getUrl, DeleteRecord } from './Component/apiCall';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: {
        data: [],
      },
      fetch: false,
      loading: false,
      activePage: 1
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUrl();
  }

  async getUrl() {
    let res = await getUrl(this.state.activePage);
    this.setState({
      userList: res.data || [],
      loading: false,
      fetch: false,
      activePage: res.data.page,
      totalPages: res.data.total_pages,
    });
  }

  getPages = () => {
    // const pagination = [];
    // let className = '';
    // for (let i = 1; i <= this.state.totalPages; i++) {
    //   this.state.activePage === i ? className = 'page activePage' : className = 'page pages';
    //   pagination.push();
    // }
    return (
      <div className="pagination" >
        {
          Array(this.state.totalPages).fill(0).map((btn, i) =>
           <button className={ this.state.activePage === i+1 ?'page activePage' :'page pages'} key={i + 1} id={i + 1}
            onClick={e => this.pagination(e)}>{btn + i + 1}</button>)
        }
      </div>
    );
  }

  pagination(e) {
    e.preventDefault();
    this.setState({ activePage: e.target.id, fetch: true }, () => { this.getUrl() });
  }

  DeleteUser(id) {
    if (window.confirm('are you sure you want to delete')) {
      if (DeleteRecord(id)) {
        console.log("deleted");
      }
    }
    else {
      console.log("error");
    }
  }

  render() {
    return (
      <div className='main'>
        <Header />
        {this.state.loading ?
          <h3> Please Wait while we are getting User Details... </h3>
          :
          <div className="main-table">
            <div className="div-table">
              <div className="div-row-header">
                <div className="div-col-first"><b>First Name</b></div>
                <div className="div-col"><b>Last Name</b></div>
                <div className="div-col"><b>Avatar</b></div>
                <div className="div-col"><b>Action</b></div>
              </div>

              {this.state.userList.data.map((u, i) => (
                <div key={i} className='div-row'>
                  <div className="div-col-first">{u.first_name}</div>
                  <div className="div-col">{u.last_name}</div>
                  <div className="div-col">
                    <img alt='Profile ' src={u.avatar} />
                  </div>
                  <div className="div-col">
                    <NavLink className="action" exact to={`/App/Edit/${u.id}`}>Edit</NavLink> |
                    <NavLink className="action" to={'/App'} onClick={() => this.DeleteUser(u.id)}>Delete</NavLink>
                  </div>
                </div>
              ))}
            </div>
            {this.getPages()}
            {this.state.fetch ? <span className="fetching">Fetching details..</span> : null}
          </div>
        }
      </div >
    );
  }
}

export default App;
