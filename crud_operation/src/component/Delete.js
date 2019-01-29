import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {deleteRecord} from './apiCall';

class Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      cancel: false,
    };
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.confirmDelete();
  }

  
  confirmDelete() {
      console.log("deleted");
    if (window.confirm('Are you sure you want to delete this user?')) {
      let Id=this.props.match.params.id;
      deleteRecord(Id)
      .then(res => {
        this.setState({delete:true});
      })
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