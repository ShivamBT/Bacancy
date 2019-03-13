import React, { Component } from "react";
import { getReceptionList } from "../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import "./Reception.css";
import { Button } from "reactstrap";
import { FaMobileAlt, FaEnvelope, FaBirthdayCake } from "react-icons/fa";

export class Reception extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            data: [],
            current_page: 1,
            total_pages: "",
            search: {
                id: "",
                value: ""
            },
            imagePath:'',
        };
        this.fetchData = this.fetchData.bind(this);
        this.onFilteredChange = this.onFilteredChange.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.onFilteredChange = this.onFilteredChange.bind(this);
    }

    async paginationHandler(pageIndex) {
        await this.setState({ current_page: pageIndex + 1 });
        this.fetchData();
    }

    async onFilteredChange(e) {
        let search = { ...this.state.search };
        let i = e.length - 1;

        if (e.length === 0) {
            search["id"] = "";
            search["value"] = "";
        } else {
            search[`id`] = e[i].id;
            search[`value`] = e[i].value;
        }

        await this.setState({ search });
        console.log("e  is :", e);
        this.fetchData();
    }

    async fetchData() {
        let result = await getReceptionList(
            this.state.current_page,
            this.state.search,
            this.state.token
        );
        console.log("Result of Reception is:", result);

        this.setState({
            data: result.data.data,
            imagePath:result.data.imagePath,
            total_pages: Math.ceil(result.data.totalRecords / 20)
        });

    }

    async componentDidMount() {
        await this.setState({ token: localStorage.getItem("token") });
        this.fetchData();
    }

    render() {
        let columns = [
            {
                id:"name",
                Header: "Name",
                accessor: "fullName"
            },
            {
                Header: "Profile Picture",
                accessor: "picture",
                Cell: row => {
                    return (
                        <div>
                            <img
                                height="30"
                                src={this.state.imagePath + row.original.picture}
                            />
                        </div>
                    );
                }
            },
            {
                Header: "Main Unit Id",
                accessor: "family.families_units[0].unit.officialId"
            },

            {
                Header: "Building",
                accessor: "family.families_units[0].unit.building.name"
            },
            {
                Header: "Telephone",
                accessor: "telephone"
            },

            {
                Header: "",
                Cell: row => {
                    return (
                        <div>
                            <Button color="success">Receive</Button>
                        </div>
                    );
                }

            },
            {
                Header: "Complete",
                Cell: row => {
                    console.log("Row is :", row);               
                    return (
                        <div key={row.index} >
                            {row.original.telephone ? null : <span className="icon"><FaMobileAlt /></span>}
                            {row.original.email ? null : <span className="icon"><FaEnvelope /></span> }
                            {row.original.dateOfBirth ? null : <span className="icon"><FaBirthdayCake /></span>}
                        </div>
                    )
                }

            }

        ];

        return (
            <div className="reception">
                <div className="sidebar">
                    <Sidebar {...this.props} />
                </div>

                <div className="logout">
                    <LogOutComponent {...this.props} />
                </div>

                
                
                <div className="receptionList">
                    <h1 className="receptionHeading">Reception</h1>
                    <ReactTable
                        data={this.state.data}
                        columns={columns}
                        className="receptionList"
                        pages={this.state.total_pages}
                        page={this.state.current_page - 1}
                        manual
                        onPageChange={pageIndex => this.paginationHandler(pageIndex)}
                        onFilteredChange={this.onFilteredChange}
                        onFetchData={this.fetchData}
                        noDataText="Please Wait ..."
                        sortable={true}
                        filterable={true}
                    />
                </div> 
            </div>
        );
    }
}