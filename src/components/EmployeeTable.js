import React, { Component } from "react";
import EmployeeRow from "./EmployeeRow.js";
// import API from "../utils/API";
import axios from "axios";
import SearchBar from "./SearchBar.js";

class EmployeeTable extends Component {
  state = {
    empList: [],
    displayList: [],
    sortKey: "",
    search: "",
    sortNameIcon: "fa fa-sort",
    sortDobIcon: "fa fa-sort"
  };

  getEmployees() {
    axios.get("https://randomuser.me/api/?results=20&nat=us").then(res => {
      res.data.results.forEach(emp => {
        emp.fullName = emp.name.first + " " + emp.name.last;
        emp.birthdate = emp.dob.date.substr(0, 10);
      });
      this.setState({
        empList: res.data.results,
        displayList: res.data.results
      });
    });
  }

  async componentDidMount() {
    await this.getEmployees();
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value });
    let search = event.target.value.toLowerCase();
    const newList = this.state.empList.filter(
      emp => emp.fullName.substring(0, search.length).toLowerCase() === search
    );
    this.setState({ displayList: newList });
  };

  handleSortChange = sortField => {
    if (sortField === "name") {
      switch (this.state.sortNameIcon) {
        case "fa fa-sort":
        case "fa fa-sort-down":
          this.setState({
            sortNameIcon: "fa fa-sort-up",
            sortDobIcon: "fa fa-sort"
          });
          this.sortEmpList("asc");
          break;
        case "fa fa-sort-up":
          this.setState({
            sortNameIcon: "fa fa-sort-down",
            sortDobIcon: "fa fa-sort"
          });
          this.sortEmpList("desc");
          break;
      }
    } else {
      switch (this.state.sortDobIcon) {
        case "fa fa-sort":
        case "fa fa-sort-down":
          this.setState({
            sortDobIcon: "fa fa-sort-up",
            sortNameIcon: "fa fa-sort"
          });
          this.sortDobList("asc");
          break;
        case "fa fa-sort-up":
          this.setState({
            sortDobIcon: "fa fa-sort-down",
            sortNameIcon: "fa fa-sort"
          });
          this.sortDobList("desc");
          break;
      }
    }
  };

  sortEmpList = direction => {
    // sort the employee list by name either up or down
    let sortedList = [];
    if (direction === "asc") {
      sortedList = this.state.empList.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    } else {
      sortedList = this.state.empList.sort((a, b) =>
        b.fullName.localeCompare(a.fullName)
      );
    }
    this.setState({ displayList: sortedList });
  };

  sortDobList = direction => {
    let sortedList = [];
    if (direction === "asc") {
      sortedList = this.state.empList.sort((a, b) =>
        a.birthdate.localeCompare(b.birthdate)
      );
    } else {
      sortedList = this.state.empList.sort((a, b) =>
        b.birthdate.localeCompare(a.birthdate)
      );
    }
    this.setState({ displayList: sortedList });
  };

  render() {
    return (
      <div className="container w-100">
        <SearchBar
          search={this.state.search}
          handleSearchChange={this.handleSearchChange}
        />
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-striped mt-5">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>
                    Name &nbsp;&nbsp; &nbsp;{" "}
                    <i
                      sortField="name"
                      className={this.state.sortNameIcon}
                      onClick={() => this.handleSortChange("name")}
                      sort={this.sortEmpList}
                    />
                  </th>
                  <th>Phone</th>
                  <th>Email Address</th>
                  <th>
                    DOB &nbsp;&nbsp; &nbsp;{" "}
                    <i
                      sortField="dob"
                      className={this.state.sortDobIcon}
                      onClick={() => this.handleSortChange("dob")}
                      sort={this.handleDobSort}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.displayList.map(employee => (
                  <EmployeeRow
                    thumbnail={employee.picture.thumbnail}
                    name={employee.fullName}
                    phone={employee.phone}
                    email={employee.email}
                    dob={employee.birthdate}
                    id={employee.id.value}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeTable;
