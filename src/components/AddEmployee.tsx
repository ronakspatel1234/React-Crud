import React from 'react';
import { Formik, FormikActions, FormikProps } from 'formik';
import { string, object } from 'yup';
import axios from 'axios';

export default class AddEmployee extends React.Component<any, any>{
    /**
     * Email reg exp of add employee
     */
    public emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    /**
     * Validation schema of customer form
     */
    public validationSchema = object().shape<any>({
        name: string().required().max(13).min(2),
        address: string().required().max(140).min(15),
        designation: string().required(),
        file: string().required(),
        email: string().matches(this.emailRegExp, 'enter a valid email').required()

    });
    public fileInput: any;


    constructor(props: any) {
        super(props);
        this.state = {};
        this.fileInput = React.createRef();
    }

    /**
     * Handles submit
     * @param customer 
     * @param { setSubmitting, resetForm } 
     */
    public handleSubmit(values: any, { setSubmitting, resetForm }: FormikActions<any>): void {
        console.log('file', this.fileInput.current.files);
        setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
        axios.post('http://172.16.3.60:8080/employee', values, { headers: { Authorization: 'Bearer ' + localStorage.getItem("access_token") } }).then((response: any) => {
            setSubmitting(false);
            resetForm();
            this.props.history.push('/employee');
        });
    }

    public renderForm(props: FormikProps<any>): any {
        return (
            <form onSubmit={props.handleSubmit}>
                {/* Text field */}
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.name} name="name" />
                    {props.errors.name && <div >{props.errors.name}</div>}
                </div>

                {/* Textarea field */}
                <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.address} name="address" />
                    {props.errors.address && <div >{props.errors.address}</div>}
                </div>
                {/* Select field */}
                <div className="form-group">
                    <label>Select your designation </label>
                    <select className="form-control" onChange={props.handleChange} value={props.values.designation} name="designation">
                        <option >Select your designation</option>
                        <option value="hummus resource">Human Resource</option>
                        <option value="accountant">Accountant</option>
                        <option value="programmer">Programmer</option>
                        <option value="tester">Tester</option>
                    </select>
                    {props.errors.designation && <div >{props.errors.designation}</div>}
                </div>

                {/* File upload */}
                <div className="form-group">
                    <label>Upload file</label>
                    <input className="form-control" type="file" ref={this.fileInput} name="file" onChange={props.handleChange} value={props.values.file} />
                    {props.errors.file && <div >{props.errors.file}</div>}
                </div>

                {/* <select multiple={true} value={['a','b','c']} onChange={props.handleChange} name="multiple">
                    <option >Select your designation</option>
                    <option value="hummus resource">Human Resource</option>
                    <option value="accountant">Accountant</option>
                    <option value="programmer">Programmer</option>
                    <option value="tester">Tester</option>
                </select> */}
                {/* checkBox  */}
                <div className="form-group">
                    <label>Hobby</label>
                    <input type="checkbox" value={props.values.Dancing} onChange={props.handleChange} name="dancing" />
                    <span>Dancing</span><br />
                    <input type="checkbox" value={props.values.Driving} onChange={props.handleChange} name="driving" />
                    <span>Driving</span><br />
                    <input type="checkbox" value={props.values.Singing} onChange={props.handleChange} name="singing" />
                    <span>Singing</span><br />
                </div>

                {/* radio Button */}
                <div className="form-group">
                    <label>Gender</label>
                    <input type="radio" onChange={props.handleChange} value="male" name="gender" />Male <br />
                    <input type="radio" onChange={props.handleChange} value="female" name="gender" />Female <br />
                </div>

                {/* Text field */}
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} name="email" />
                    {props.errors.email && <div >{props.errors.email}</div>}
                </div>

                <button type="submit">Submit</button>
            </form>
        )
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ name: '', address: '', designation: '', file: '', dancing: false, driving: false, singing: false, gender: '', email: '' }}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit.bind(this)}
                    render={fields => this.renderForm(fields)}
                />
            </div>

        )
    }
}