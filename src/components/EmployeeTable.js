import React, { Component } from "react";
import EmployeeRow from "./EmployeeRow.js";
// import API from "../utils/API";
import axios from "axios";

class EmployeeTable extends Component {
  state = {
    empList: [],
    sortKey: ""
  };

  getEmployees() {
    axios.get("https://randomuser.me/api/?results=4&nat=us").then(res => {
      console.log("Results in getEmployees: ", res.data.results);
      this.setState({ empList: res.data.results });
      console.log("STATE: ", this.state);
    });
  }

  async componentDidMount() {
    await this.getEmployees();
    console.log("in state.emplist: ", this.state.empList);
  }

  render() {
    return (
      <div className="container w-100">
        <table className="table table-striped">
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
            {this.state.empList.map(employee => (
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
    );
  }
}

export default EmployeeTable;
