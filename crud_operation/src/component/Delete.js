import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      cancel: false,
    };
    this.deleteRecord = this.deleteRecord.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.confirmDelete();
  }

  deleteRecord() {
    axios.delete(`https://reqres.in/api/users/${this.props.match.params.id}`)
      .then((json) => {
        console.log('User deleted : ', json);
        this.setState({ delete: true });
      }).catch((err) => {
        console.log("Error : ", err);
      });
  }

  confirmDelete() {
      console.log("deleted");
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.deleteRecord();
    } else {
      this.setState({ cancel: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.delete ? <Redirect to='/' /> : null}
        {this.state.cancel ? <Redirect to='/' /> : null}
      </div>
    );
  }
}

Delete.propTypes = {
  match: PropTypes.object,
};

export default Delete;