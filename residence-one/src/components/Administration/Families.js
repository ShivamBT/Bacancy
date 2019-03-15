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
            search: [],
            string:"",
            sorting: {
                sort: "",
                field:""
            }
        };
        this.fetchData = this.fetchData.bind(this);
        this.onFilteredChange = this.onFilteredChange.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.onSortedChange = this.onSortedChange.bind(this);
    }

    async onSortedChange(e)
    {
        let sorting = { ...this.state.sorting };
        console.log("e is :", e);
        sorting["sort"] = e[0].desc ? "desc" : "asc";

        sorting["field"] = e[0].id;
        await this.setState({ sorting: sorting });
        this.fetchData();        
    }

    async paginationHandler(pageIndex) {
        await this.setState({ current_page: pageIndex + 1 });
        this.fetchData();
    }

    async onFilteredChange(e) {
        let search = { ...this.state.search };
        let i = e.length - 1;

        if (e.length === 0) {
            search[0]["id"] = "";
            search[0]["value"] = "";
        } else {
            search = e;
        }
        let string = "";
        
        for (let i = 0; i < search.length; i++)
        {
            string = string + `${search[i].id}=${search[i].value}&`;
        }
                   
        
        await this.setState({ search,string });
        console.log("e  is :", e);
        this.fetchData();
    }

    async fetchData() {
        let result = await getFamilyList(
            this.state.current_page,
            this.state.string,
            this.state.sorting,
            this.state.token
        );
        this.setState({
            data: result.data.data,
            total_pages: Math.ceil(result.data.totalRecords / 20)
        });

        console.log("Result is :", result);

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
                id:"mainPerson_name",
                Header: "Main Person",
                accessor: "mainPerson.fullName"
            },
            {
                id:"mainPerson_telephone",
                Header: "Mobile Number",
                accessor: "mainPerson.telephone"
            },

            {
                id:'mainPerson_personStatus',
                Header: "Owner/Renter",
                accessor: "mainPerson.personStatus"
            },
            {
                id: 'families_units_unit_officialId',
                Header: "Main Unit",
                accessor: "families_units[0].unit.officialId"
            },
            {
                id:'families_units_unit_building_name',
                Header: "Building",
                accessor: "families_units[0].unit.building.name"
            },
            {
                id:'families_units_unit_shares',
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
                        onSortedChange={this.onSortedChange}
                        noDataText="Please Wait ..."
                        sortable={true}
                        filterable={true}
                    />
                </div> 
            </div>
        );
    }
}
