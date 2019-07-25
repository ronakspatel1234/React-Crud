import React from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import enCustomerResources from '../locales/en/customer.json';
import frCustomerResources from '../locales/fr/customer.json';

export interface CustomerModal1 {
    onHide: boolean;
    addModalShow: boolean;
    history: any;
}

export default class Customer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.props.i18n.addResourceBundle('en', 'customer', enCustomerResources, true)
        this.props.i18n.addResourceBundle('fr', 'customer', frCustomerResources, true)
        this.state = { customers: [], addModalShow: false }
        this.deleteRecord = this.deleteRecord.bind(this);
        console.log(this.props);

    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillUnmount() {
        // TO DO
        this.props.i18n.removeResourceBundle('fr', 'customer');
        this.props.i18n.removeResourceBundle('en', 'customer');
        console.log(this.props.i18n.store)
    }

    refreshList() {
        // this.setState({
        //     deps: [
        //         { 'DepartmentID': 1, 'DepartmentName': 'IT' },
        //         { 'DepartmentID': 2, 'DepartmentName': 'Finance' },
        //         { 'DepartmentID': 3, 'DepartmentName': 'HR' },
        //         { 'DepartmentID': 4, 'DepartmentName': 'Accountant' }
        //     ]
        // })
        // fetch('http://172.16.3.60:8080/customers')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ customers: data });
        //     })
        console.log(localStorage.getItem("access_token"));

        axios.get('http://172.16.3.60:8080/customers', { headers: { Authorization: 'Bearer ' + localStorage.getItem("access_token") } })
            .then(response => {
                this.setState({ customers: response.data });
            })

    }
    public deleteRecord(id: number, event: any) {
        event.stopPropagation();
        axios.delete(`http://172.16.3.60:8080/customers/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem("access_token") } })
            .then(res => {
                this.refreshList();
            })
    }

    public editRecord(id: number) {
        let path = `/edit-customer/` + id;
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <h4>
                    <NavLink to="/add-customer">{this.props.i18n.t('CUSTOMER.ADD_CUSTOMER')}</NavLink>
                </h4>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Group</th>
                            <th>CreatedAt</th>
                            <th>Email</th>
                            <th>MobileNumber</th>
                            <th colSpan={2}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map((customer: any) =>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.company}</td>
                                <td>{customer.group}</td>
                                <td>{customer.createdAt}</td>
                                <td>{customer.email}</td>
                                <td>{customer.mobileNumber}</td>
                                <td><button onClick={this.editRecord.bind(this, customer.id)}>Edit</button></td>
                                <td><button onClick={this.deleteRecord.bind(this, customer.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}
