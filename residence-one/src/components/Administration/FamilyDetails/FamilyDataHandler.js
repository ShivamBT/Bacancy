import React, { Component } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { getResidents } from "../../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./FamilyDataHandler.css";

export class FamilyDataHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      data: [],
      current_active: "",
      active: true,
      inactive: false,
      status: "active",
      imagePath: ""
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    let result = await getResidents(
      this.props.match.params.id,
      this.state.status,
      this.state.token
    );
      console.log("result of fetchdata is :", result);
    this.setState({
      data: result.data.data.users,
      imagePath: result.data.imagePath
    });
  }

  async clickHandler(e) {
    await this.setState({
      status: e.target.value,
      active: !this.state.active,
      inactive: !this.state.inactive
    });

    this.fetchData();
  }

  async componentDidMount() {
    await this.setState({
      current_active: this.props.current_active,
      token: localStorage.getItem("token")
    });
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      await this.setState({
        current_active: this.props.current_active
      });

      this.fetchData();
    }
  }

  render() {
    let column1 = [
      {
        Header: "Full Name",
        accessor: "fullName"
      },
      {
        Header: "Profile Picture",
        accessor: "picture",
        Cell: row => {
          let src = this.state.imagePath + row.original.picture;
          return <img src={src} height={100} width={100} />;
        }
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth"
      },
      {
        Header: "E-Mail",
        accessor: "email"
      },
      {
        Header: "Mobile Number",
        accessor: "telephone"
      },
      {
        Header: "Active On",
        
      }
    ];
    return (
        <div className="mainHeading">
            
         <Nav tabs>
          <NavItem>
            <NavLink active={this.state.active}>
              <Button
                color="link"
                value="active"
                onClick={e => this.clickHandler(e)}>
                Active
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={this.state.inactive}>
              <Button
                color="link"
                value="inactive"
                onClick={e => this.clickHandler(e)}>
                Inactive
              </Button>
            </NavLink>
          </NavItem>
        </Nav>

        <ReactTable data={this.state.data} columns={column1}
          style={{ fontSize: "15px" }}
          defaultPageSize={8}/>  
      </div>
    );
  }
}
