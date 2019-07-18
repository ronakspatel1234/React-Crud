import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default class Employee extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { employees: [] };
    }

    /**
     * Components did mount life cycle
     */
    public componentDidMount() {
        axios.get('http://172.16.3.60:8080/employee').then((response: any) => {
            this.setState({ employees: response.data });
        });
    }
    render() {
        return (
            <div>
                <h4>
                    <Link to="/add-employee">Add new Employee</Link>
                </h4>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Designation</th>
                            <th>File</th>
                            <th>Dancing</th>
                            <th>Driving</th>
                            <th>Singing</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee: any) =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.address}</td>
                                <td>{employee.file}</td>
                                <td>{employee.designation}</td>

                                <td>{employee.dancing ? <i className="fa fa-check" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true"></i>}</td>
                                <td>{employee.driving ? <i className="fa fa-check" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true"></i>}</td>
                                <td>{employee.singing ? <i className="fa fa-check" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true"></i>}</td>
                                <td>{employee.gender}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}
