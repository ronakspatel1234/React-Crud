import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikActions, FormikProps, FormikBag } from 'formik';
import axios from 'axios';
import { string, object, number, date } from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export class Customer {
    public name: string;
    public company: string;
    public group: string;
    public createdAt: Date;
    public email: string;
    public mobileNumber: number;
    public id?: number;
    match?: any;
    constructor(
        name: string = '',
        company: string = '',
        group: string = '',
        createdAt: Date = new Date(),
        email: string = '',
        mobileNumber: number = 0
    ) {
        this.name = name;
        this.company = company;
        this.group = group;
        this.createdAt = createdAt;
        this.email = email;
        this.mobileNumber = mobileNumber;

    }

}

export default class CustomerForm extends React.Component<any, any> {


    /**
     * Validation schema of customer form
     */
    public validationSchema = object().shape<Customer>({
        name: string().required().max(13).min(2),
        email: string().email().required(),
        company: string().required().min(2),
        group: string().required().min(2),
        createdAt: date().required(),
        mobileNumber: number().required().min(10),

    });

    /**
     * Initial values of customer form
     */
    public initialValues: Customer = new Customer();
    constructor(props: any) {
        super(props);
        this.state = { customer: new Customer(), isEditMode: false, startDate: new Date() };
        this.handleChange = this.handleChange.bind(this);
        console.log(this.props);

    }
    /**
     * Components did mount
     */
    public componentDidMount(): void {
        const id = this.props.match.params.id;
        this.setState({ isEditMode: false });
        if (id) {
            this.setState({ isEditMode: true });
            this.getRecordById(id);
        }

    }

    /**
     * Gets record by id
     * @param id 
     */
    public getRecordById(id: number): void {
        axios.get('http://172.16.3.60:8080/customers/' + id)
            .then(response => {
                this.setState({ customer: response.data });
                this.setState({ startDate: new Date(response.data.createdAt) })
            })
    }


    /**
     * Handles submit
     * @param customer 
     * @param { setSubmitting, resetForm } 
     */
    public handleSubmit(customer: Customer, { setSubmitting, resetForm }: FormikActions<Customer>): void {
        debugger;
        customer.createdAt = this.state.startDate;
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
        if (this.state.customer.id) {
            axios.put(`http://172.16.3.60:8080/customers/${customer.id}`, customer).then((response: any) => {
                setSubmitting(false);
                this.props.history.push('/customer');
            });
        } else {
            axios.post('http://172.16.3.60:8080/customers', customer).then((response: any) => {
                setSubmitting(false);
                resetForm();
                this.props.history.push('/customer');
            });
        }
    }

    handleChange(date: any) {
        this.setState({
            startDate: date
        });
    }

    /**
     * Renders form
     * @param fields 
     * @returns  
     */
    public renderForm(fields: FormikProps<Customer>): any {
        return (<Form>
            <div className="form-group">
                <label htmlFor="name">NAME</label>
                <Field className="form-control" type="string" name="name" />
                <ErrorMessage name="name" component="div" /> <br />
            </div>

            <div className="form-group">
                <label htmlFor="company">COMPANY</label>
                <Field className="form-control" type="string" name="company" />
                <ErrorMessage name="company" component="div" /> <br />
            </div>

            <div className="form-group">
                <label htmlFor="group">GROUP</label>
                <Field className="form-control" type="string" name="group" />
                <ErrorMessage name="group" component="div" /> <br />
            </div>

            <div className="form-group">
                <label htmlFor="createdAt">CREATED AT</label>
                <DatePicker className="form-control" selected={this.state.startDate}
                    onChange={this.handleChange} name="createdAt" />
                <ErrorMessage name="createdAt" component="div" /> <br />
            </div>

            <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <Field className="form-control" type="string" name="email" />
                <ErrorMessage name="email" component="div" /> <br />
            </div>

            <div className="form-group">
                <label htmlFor="mobileNumber">MOBILE NUMBER</label>
                <Field className="form-control" type="number" name="mobileNumber" />
                <ErrorMessage name="mobileNumber" component="div" /> <br />
            </div>
            <button type="submit" >Submit</button>
        </Form >);
    }


    render() {
        this.initialValues = { ...this.state.customer };
        return (
            <div>
                <h1>CUSTOMER FORM </h1>
                <h1>Name: {this.state.customer.name}</h1>
                <Formik
                    initialValues={this.initialValues}
                    enableReinitialize={true}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit.bind(this)}
                    render={(fields: FormikProps<Customer>) => this.renderForm(fields)}
                />

            </div>
        )
    }
}