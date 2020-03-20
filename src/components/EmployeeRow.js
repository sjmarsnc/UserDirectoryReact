import React from 'react';

const EmployeeRow = ( props ) => {
    console.log("EmployeeRow: ", props);  
     
    return (
        <tr>
            <td><img src={props.thumbnail} alt = "picture" /></td>
            <td>{props.first} {props.last}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td>{props.dob}</td>
        </tr>
    )
};

export default EmployeeRow;
