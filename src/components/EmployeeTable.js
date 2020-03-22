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
    search: ""
  };

  getEmployees() {
    axios.get("https://randomuser.me/api/?results=8&nat=us").then(res => {
      console.log("Results in getEmployees: ", res.data.results);
      this.setState({
        empList: res.data.results,
        displayList: res.data.results
      });
      console.log("in getEmployees STATE: ", this.state);
    });
  }

  async componentDidMount() {
    await this.getEmployees();
  }

  handleSearchChange = event => {
    console.log("In handleSearchChange: ", event.target.value);
    this.setState({ search: event.target.value });
    let search = event.target.value.toLowerCase();
    console.log("search string: ", this.state.search, search);
    const newList = this.state.empList.filter(
      emp => emp.name.first.substring(0, search.length).toLowerCase() === search
    );
    console.log("Subset of empList: ", this.state.newList);
    this.setState({ displayList: newList });
  };

  sortEmpList = direction => {
    // sort the employee list by name either up or down
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
              <thead className="thead-light">
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email Address</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
                {this.state.displayList.map(employee => (
                  <EmployeeRow
                    thumbnail={employee.picture.thumbnail}
                    first={employee.name.first}
                    last={employee.name.last}
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
