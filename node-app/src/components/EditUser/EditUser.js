import React, { Component } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { findUser, createUser, updateUser } from '.././ApiCalls/ApiCall';
import { Badge3, Badge4 } from ".././UI Components/UIComponent";


class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                fname: '',
                lname: '',
                email: '',
                age: '',
                mobile: '',
            },
            userID: ''
        }

        this.changeValue = this.changeValue.bind(this);
        this.submitValue = this.submitValue.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.flag === "1") {
            findUser(this.props.match.params.id)
                .then(res => {
                    if (res.data.data === null) {
                        this.props.history.push("/notfound");
                        return;
                    }
                    console.log("Edit Result is : ", res.data.data);
                    this.setState({
                        payload: res.data.data,
                        userID: res.data.data.id
                    })
                })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            let payload = { ...this.state.payload };
            payload = {
                fname: '',
                lname: '',
                email: '',
                age: '',
                mobile: '',
            }
            let userID = '';
            this.setState({ payload, userID });
        }
    }

    changeValue(e) {
        if (e.target.name === "userID") {
            let userID = e.target.value;
            this.setState({ userID });
        }
        else {
            let payload = { ...this.state.payload };
            payload[e.target.name] = e.target.value;
            this.setState({ payload });
        }

    }


    submitValue() {
        let payload = { ...this.state.payload };
        payload['Id'] = this.state.userID;
        createUser(payload)
            .then(res => {
                console.log("Created User is :", res);
            });
        this.props.history.push("/");
    }




    editUser() {
        updateUser(this.state.userID, this.state.payload)
            .then(res => {
                console.log("Updated User is :", res);
            });
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Form>
                    <h2>{this.props.match.params.flag === "1" ? <Badge3 /> : <Badge4 />}</h2>



                    <FormGroup>
                        <Label>First Name:</Label>
                        <input type="text" name="fname" value={this.state.payload.fname} onChange={e => this.changeValue(e)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Last Name:</Label>
                        <input type="text" name="lname" value={this.state.payload.lname} onChange={e => this.changeValue(e)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Email:</Label>
                        <input type="email" name="email" value={this.state.payload.email} onChange={e => this.changeValue(e)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Mobile:</Label>
                        <input type="number" name="mobile" value={this.state.payload.mobile} onChange={e => this.changeValue(e)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Age:</Label>
                        <input type="number" name="age" value={this.state.payload.age} onChange={e => this.changeValue(e)} />
                    </FormGroup>
                    <div>
                        {this.props.match.params.flag === '1' ?
                            <Button color="dark" onClick={this.editUser}>
                                Update User
                            </Button> :
                            <Button color="primary" onClick={this.submitValue}>
                                Create User
                            </Button>
                        }
                    </div>
                </Form>

            </div>
        );
    }
}

export default EditUser;

