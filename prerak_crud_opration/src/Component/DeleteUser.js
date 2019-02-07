import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Deleted: false,
      cancel: false,
    };
  }

  componentDidMount(){
    this.confirmDelete();
  }

  DeleteRecord() {
    axios.delete(`https://reqres.in/api/users/${this.props.match.params.id}`)
      .then((res) => {
        console.log(' Data Deleted.', res);
        this.setState({ Deleted: true });
      }).catch((error) => {
        console.log(error);
      });
  }

  cancel(){
    this.setState({ cancel: true });
  }

  confirmDelete(){
    if (window.confirm('are you sure you want to delete')) {
      this.DeleteRecord();
    } else {
      this.cancel();
    }
  }

  render() {
    return (
      <div>
        {this.state.delete ? <Redirect to='/App/' /> : null}
        {this.state.cancel ? <Redirect to='/App/' /> : null}

      </div>

    );
  }
}
DeleteUser.propTypes = {
  match: PropTypes.object,
};

export default DeleteUser;
