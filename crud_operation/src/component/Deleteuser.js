import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {deleteRecord,deleteRecord1} from './apiCall';

class Deleteuser extends Component {

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
      console.log("Deletion Prompt");
    if (window.confirm('Are you sure you want to delete this user?')) {
      let Id=this.props.match.params.id;
      deleteRecord1(Id)
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

Deleteuser.propTypes = {
  match: PropTypes.object,
};

export default Deleteuser;