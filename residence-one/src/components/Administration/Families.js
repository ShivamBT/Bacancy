import React, { Component } from "react";
import { getFamilyList } from "../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { LogOutComponent } from "../LogOutComponent/LogOutComponent";
import "./Families.css";

export class Families extends Component {
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
            }
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
        let result = await getFamilyList(
            this.state.current_page,
            this.state.search,
            this.state.token
        );
        console.log("Result of Family is:", result);

        this.setState({
            data: result.data.data,
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
                accessor: "name"
            },
            {
                Header: "Main Person",
                accessor: "mainPerson.fullName"
            },
            {
                Header: "Mobile Number",
                accessor: "mainPerson.telephone"
            },

            {
                Header: "Owner/Renter",
                accessor: "mainPerson.personStatus"
            },
            {
                Header: "Main Unit",
                accessor: "families_units[0].unit.officialId"
            },
            {
                Header: "Building",
                accessor: "families_units[0].unit.building.name"
            },
            {
                Header: "Shares",
                accessor: "families_units[0].unit.shares"
            },
           
        ];

        return (
            <div className="family">
                <div className="sidebar">
                    <Sidebar {...this.props} />
                </div>

                <div className="logout">
                    <LogOutComponent {...this.props} />
                </div>

                
                 <div className="familyList">
                    <h1 className="familyHeading">Families</h1>
                    <ReactTable
                        data={this.state.data}
                        columns={columns}
                        className="familyList"
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
