import React, { Component } from "react";
import { getPoolEntries } from "../../ApiCalls/ApiCalls";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label
} from "recharts";

export class PoolEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      dateStart: "",
      dateEnd: "",
      data: [],
      current_page: 1,
      total_pages: "",
      graphData: []
    };
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async changeCurrentPage(pageIndex) {
    await this.setState({ current_page: pageIndex + 1 });
    this.fetchData();
  }

  async fetchData() {
    let x = new Date();

    let y, dateStart, dateEnd;
    if (this.props.dropDownActive === "current_year") {
      dateStart = `${x.getFullYear()}-${x.getMonth()}-${x.getDate()}`;
      dateEnd = `${x.getFullYear()}-01-01`;
    } else {
      dateStart = `${x.getFullYear() - 1}-12-31`;
      dateEnd = `${x.getFullYear() - 1}-01-01`;
    }

    await this.setState({
      dateStart,
      dateEnd,
      token: localStorage.getItem("token")
    });
    let result = await getPoolEntries(
      this.state.dateStart,
      this.state.dateEnd,
      this.state.current_page,
      this.state.token
    );
    console.log("Result of pool entries is : ", result);
    let graphObject = { ...result.data.graphObject };
    let graphData = [];
    let i = 0;

    let month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    let formattedDate = "";

    for (let x in graphObject) {
      let exactDate = new Date(x);
      formattedDate = month[exactDate.getMonth()] + " " + exactDate.getDate();
      graphData[i] = { date: formattedDate, value: graphObject[x] };
      i++;
    }

    graphData = graphData.reverse();
    this.setState({
      graphData,
      data: result.data.data,
      total_pages: Math.ceil(result.data.totalRecords / 20)
    });
  }

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.fetchData();
    }
  }

  render() {
    let column = [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: row => {
          if (
            this.state.data[row.index].createdAt === null ||
            this.state.data[row.index].createdAt === undefined
          ) {
            return "";
          } else {
            let i = this.state.data[row.index].createdAt.indexOf("T");
            let date = this.state.data[row.index].createdAt.substring(0, i);
            return `${date}`;
          }
        }
      },
      {
        Header: "Time",
        accessor: "createdAt",
        Cell: row => {
          if (
            this.state.data[row.index].createdAt === null ||
            this.state.data[row.index].createdAt === undefined
          ) {
            return "";
          } else {
            let i = this.state.data[row.index].createdAt.indexOf("T");
            let time = this.state.data[row.index].createdAt.substring(
              i + 1,
              i + 6
            );
            return `${time}`;
          }
        }
      },
      {
        Header: "Main Unit Id",
        accessor: "mainUnit"
      },
      {
        Header: "Name",
        accessor: "user.fullName"
      },
      {
        Header: "Guests",
        accessor: "nbGuests"
      },
      {
        Header: "Building",
        accessor: "unit.building.name"
      },
      {
        Header: "Entry",
        accessor: "unit.entry.name"
      }
    ];
    return (
      <div>
        <LineChart
          width={900}
          height={400}
          data={this.state.graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          >
          <XAxis dataKey="date">
            <Label
              value="Date of Pool Entries"
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{
              value: "No of Pool Entries",
              position: "insideLeft",
              angle: -90
            }}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="value" stroke="purple" />
        </LineChart>

        <ReactTable
          data={this.state.data}
          columns={column}
          pages={this.state.total_pages}
          page={this.state.current_page - 1}
          noDataText="Please Wait ...."
          showPageSizeOptions={false}
          className="-striped -highlight"
          onPageChange={pageIndex => this.changeCurrentPage(pageIndex)}
          manual
        />
      </div>
    );
  }
}
