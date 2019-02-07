import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Component/div.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      fetch: false,
      loading: false,
      activePage: 1,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUrl();
  }

  getUrl = () => {
    axios.get('https://reqres.in/api/users/', {
      params: {
        page: this.state.activePage,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          userList: res.data.data || [],
          loading: false,
          fetch: false,
          activePage: res.data.page,
          totalPages: res.data.total_pages,
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  getPages = () => {
    const pagination = [];
    let className = '';
    for (let i = 1; i <= this.state.totalPages; i++) {
      this.state.activePage === i ? className = 'page activePage' : className = 'page pages';
      pagination.push(<button key={i} id={i} onClick={e => this.ClickHandler(e)} className={className}>{i}</button>);
    }

    return (
      <div className = "pagination" > { pagination }</div>
    );
  }

  ClickHandler(e) {
    e.preventDefault();
    this.setState({ activePage: e.target.id, fetch: true }, () => {
      this.getUrl();
    });
  }

  render() {
    return (

      <div className='main'>
        <h2>User CRUD Operation</h2>
        <NavLink exact to='/App' className="Navlink" activeClassName="active">Record List</NavLink> |
        <NavLink to='/App/NewUser' className="Navlink" activeClassName="active">Add Record</NavLink>
        <br />
        <br />
        {this.state.loading ? <h4>Please Wait while we are getting User Details...</h4>
          : <div>
            <div className="div-table">
              <div className="div-row">
                <div className="div-col"><b>First Name</b></div>
                <div className="div-col"><b>Last Name</b></div>
                <div className="div-col"><b>Avatar</b></div>
                <div className="div-col"><b>Action</b></div>
              </div>


              {this.state.userList.map((u, i) => (

                <div key={i} className='div-row'>
                  <div className="div-col">{u.first_name}</div>
                  <div className="div-col">{u.last_name}</div>
                  <div className="div-col"><img alt='Profile ' src={u.avatar} /></div>
                  <div className="div-col">
                    <NavLink className="action" exact to={`/App/EditUser/${u.id}`}>Edit</NavLink> |
                    <NavLink className="action" to={`/App/DeleteUser/${u.id}`}>Delete</NavLink>
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
