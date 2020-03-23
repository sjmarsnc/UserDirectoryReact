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
    sortIcon: "fa fa-sort"
  };

  getEmployees() {
    axios.get("https://randomuser.me/api/?results=20&nat=us").then(res => {
      res.data.results.forEach(emp => {
        emp.fullName = emp.name.first + " " + emp.name.last;
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

  handleSortChange = event => {
    switch (this.state.sortIcon) {
      case "fa fa-sort":
      case "fa fa-sort-down":
        this.setState({ sortIcon: "fa fa-sort-up" });
        this.sortEmpList("asc");
        break;
      case "fa fa-sort-up":
        this.setState({ sortIcon: "fa fa-sort-down" });
        this.sortEmpList("desc");
        break;
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
                      className={this.state.sortIcon}
                      onClick={this.handleSortChange}
                    />
                  </th>
                  <th>Phone</th>
                  <th>Email Address</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
                {this.state.displayList.map(employee => (
                  <EmployeeRow
                    thumbnail={employee.picture.thumbnail}
                    name={employee.fullName}
                    phone={employee.phone}
                    email={employee.email}
                    dob={employee.dob.date.substr(0, 10)}
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
