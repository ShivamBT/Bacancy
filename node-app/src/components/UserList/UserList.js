import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './UserList.css';
import { getStudentList, deleteUserData ,searchUser} from '.././ApiCalls/ApiCall';
import { Badge2 } from ".././UI Components/UIComponent";
import { Badge, InputGroup, Input, InputGroupAddon,Label } from 'reactstrap';



class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_data: [],
            deletedData: [],
            invalidMessage:''
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.displayBadge = this.displayBadge.bind(this);
        this.userDataSetter = this.userDataSetter.bind(this);
        this.searchValue = this.searchValue.bind(this);
       
    }

    

    displayBadge(id) {
        return (
            <Badge color="danger" onClick={e => this.deleteUser(id)}>
                Delete
            </Badge>
        );

    }

    userDataSetter() {
        getStudentList()
            .then(res => {
                this.setState({ student_data: res.data.data });
                return res;
            })
    }


    componentDidUpdate(prevProps, prevState) {
        console.log("Student Data is :", this.state.student_data);
    }

    async componentDidMount() {
        console.log("Did mount called");
        let result = await getStudentList();
        await this.setState({ student_data: result.data.data }, () => this.userDataSetter());
    }

    deleteUser(id) {
        if (window.confirm("Do you want to delete this user ?")) {
            deleteUserData(id)
                .then(res => {
                    console.log("User Deleted : ", res);
                    this.setState({ deletedData: res.data.data }, () => this.userDataSetter());
                })
        }
    }

    async searchValue(e) {
        let result = await searchUser(e.target.value);
        if (result.data.data.length === 0) {
            this.setState({ invalidMessage: "No user Found" });
        }

        else {
            this.setState({ invalidMessage: "" });
        }
        console.log("Search Result is :", result);
        await this.setState({ student_data: result.data.data });
       
    }

    

    render() {
        return (
            <div className="App">

                <div className="data">



                    <div className="Table">
                        <div className="Title">
                            <h2><Badge color="dark">Student Data</Badge></h2>
                            <div>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <h5>
                                            <Badge color="info">
                                                <Label>Search User:</Label>
                                            </Badge>
                                        </h5>

                                    </InputGroupAddon>
                     
                                    <Input type="text" onBlur={e => this.searchValue(e)} />
                                </InputGroup>
                                {<div style={{ color: 'red' }}>{this.state.invalidMessage}</div>}

                            </div>
                        </div>

                        <div className="Heading">
                            <div className="Cell">
                                <p>Id</p>
                            </div>
                            <div className="Cell">
                                <p>First_name</p>
                            </div>
                            <div className="Cell">
                                <p>Last_name</p>
                            </div>
                            <div className="Cell">
                                <p>Email</p>
                            </div>
                            <div className="Cell">
                                <p>Mobile_No</p>
                            </div>
                            <div className="Cell">
                                <p>Age</p>
                            </div>
                            <div className="Cell">
                                <p>Actions</p>
                            </div>
                        </div>
                        {this.state.student_data.map(u => {
                            return (
                                <div className="Row" key={u.id}>
                                    <div className="Cell">
                                        <p>{u.id}</p>
                                    </div>
                                    <div className="Cell">
                                        <p>{u.fname}</p>
                                    </div>
                                    <div className="Cell">
                                        <p>{u.lname}</p>
                                    </div>
                                    <div className="Cell">
                                        <p>{u.email}</p>
                                    </div>
                                    <div className="Cell">
                                        <p>{u.mobile}</p>
                                    </div>
                                    <div className="Cell">
                                        <p>{u.age}</p>
                                    </div>
                                    <div className="Cell">
                                        <NavLink to={`/edit/${u.id}/1`}><Badge2 /></NavLink>
                                        <NavLink to={`/`}>{this.displayBadge(u.id)}</NavLink>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        );
    }
}

export default UserList;
