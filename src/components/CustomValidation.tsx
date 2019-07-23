import React from 'react';
import { Formik, FormikActions, FormikProps, Form, ErrorMessage, Field } from 'formik';
import DatePicker from "react-datepicker";
import * as yup from 'yup';


export class CustomValidation extends React.Component<any, any> {


    constructor(props: any) {
        super(props);
        this.state = { hidden: true };
    }


    public passwordRegExp = /^[!@#\$%\^&][a-zA-Z0-9]{8,12}$/;
    /**
     * Validation schema of customer form
     */
    public validationSchema: yup.ObjectSchema<yup.Shape<{}, any>> = yup.object().shape<any>({
        createdAt: yup.date().required(),
        minDate: yup.date().required().min(new Date(), 'you can not select less or equal to today date'),
        maxDate: yup.date().required().max(new Date(), 'you can not select greater or equal to today date'),
        dateOfBirth: yup.date().required().min((new Date().getFullYear() - 18).toString(), 'You are over aged, under 18 are allowed for registration.'),
        password: yup.string().min(8).required('Password is required').matches(this.passwordRegExp, 'password must include special character, uppercase, lowercase and number  '),
        conformPassword: yup.string()
            .required('Password Confirmation is Required')
            .oneOf([yup.ref('password')], 'Passwords do not match'),

    });

    /**
     * Handles submit
     * @param customer 
     * @param { setSubmitting, resetForm } 
     */
    public handleSubmit(values: any, { setSubmitting, resetForm }: FormikActions<any>): void {
        setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
        }, 1000);

    }

    public toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    public renderForm(props: FormikProps<any>): any {
        return (

            <Form>
                <div className="form-group">
                    <label>Created At</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('createdAt', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.createdAt} name="createdAt" />
                    <ErrorMessage name="createdAt" component="div" /> <br />

                </div>
                <div className="form-group">
                    <label>Min Date Limitation</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('minDate', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.minDate} name="minDate" />
                    <ErrorMessage name="minDate" component="div" /> <br />

                </div>
                <div className="form-group">
                    <label>Max Date Limitation</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('maxDate', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.maxDate} name="maxDate" />
                    <ErrorMessage name="maxDate" component="div" /> <br />

                </div>
                <div className="form-group">
                    <label>Date of Birth</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('dateOfBirth', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.dateOfBirth} name="dateOfBirth" />
                    <ErrorMessage name="dateOfBirth" component="div" /> <br />

                </div>
                <hr />
                <div className="form-group">
                    <label>Password</label><br />
                    <Field className="form-control" type={this.state.hidden ? "password" : "text"} name="password" /><button onClick={this.toggleShow.bind(this)}>Show / Hide</button>
                    <ErrorMessage name="password" component="div" /> <br />

                </div>
                <div className="form-group">
                    <label>Conform Password</label><br />
                    <Field className="form-control" type={this.state.hidden ? "password" : "text"} name="conformPassword" /><button onClick={this.toggleShow.bind(this)}>Show / Hide</button>
                    <ErrorMessage name="conformPassword" component="div" /> <br />

                </div>

                <button type="submit">Submit</button>
            </Form >
        )
    }

    render() {
        return (
            <Formik
                initialValues={{ createdAt: '', minDate: '', maxDate: '', age: '', password: '', conformPassword: '' }}
                // enableReinitialize={true}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}

                render={(props: FormikProps<any>) => this.renderForm(props)} />
        )
    }
}