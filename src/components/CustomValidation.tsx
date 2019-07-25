import React from 'react';
import { Formik, FormikActions, FormikProps, Form, ErrorMessage, Field } from 'formik';
import DatePicker from "react-datepicker";
import * as yup from 'yup';


export class CustomValidation extends React.PureComponent<any, any> {


    constructor(props: any) {
        super(props);
        this.toggleShow = this.toggleShow.bind(this);
        this.state = { hiddenPassword: true, hiddenConformPassword: true };
    }


    public passwordRegExp = /^[!@#$%^&][a-zA-Z0-9]{8,12}$/;
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

    /**
     * Toggles show
     * @param event 
     */
    public toggleShow(event: any) {
        if (event.target.value === "hiddenPassword") {
            this.setState({ hiddenPassword: !this.state.hiddenPassword });
        } else if (event.target.value === "hiddenConformPassword") {
            this.setState({ hiddenConformPassword: !this.state.hiddenConformPassword });
        }
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
                    <ErrorMessage name="createdAt" component="p" /> <br />

                </div>
                <div className="form-group">
                    <label>Min Date Limitation</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('minDate', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.minDate} name="minDate" />
                    <ErrorMessage name="minDate" component="p" /> <br />

                </div>
                <div className="form-group">
                    <label>Max Date Limitation</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('maxDate', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.maxDate} name="maxDate" />
                    <ErrorMessage name="maxDate" component="p" /> <br />

                </div>
                <div className="form-group">
                    <label>Date of Birth</label><br />
                    <DatePicker className="form-control"
                        onChange={(e: any) => { props.setFieldValue('dateOfBirth', e); }}
                        onBlur={props.handleBlur}
                        selected={props.values.dateOfBirth} name="dateOfBirth" />
                    <ErrorMessage name="dateOfBirth" component="p" /> <br />

                </div>
                <hr />
                <div className="form-group">
                    <label>Password</label><br />
                    <div className="input-group mb-3">
                        <Field className="form-control" type={this.state.hiddenPassword ? "password" : "text"} name="password" />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-outline-secondary" value="hiddenPassword" onClick={this.toggleShow}>
                                <i className={this.state.hiddenPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i >
                            </button>
                        </div>
                    </div>
                    <ErrorMessage name="password" component="p" /> <br />

                </div>
                <div className="form-group">
                    <label>Conform Password</label><br />
                    <div className="input-group mb-3">
                        <Field className="form-control" type={this.state.hiddenConformPassword ? "password" : "text"} name="conformPassword" />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-outline-secondary" value="hiddenConformPassword" onClick={this.toggleShow}>
                                <i className={this.state.hiddenConformPassword ? "fa fa-eye" : "fa fa-eye-slash"}> </i >
                            </button>
                        </div>
                    </div>
                    <ErrorMessage name="conformPassword" component="p" /> <br />
                </div>

                <button type="submit">Submit</button>
            </Form >
        )
    }

    render() {
        return (
            <Formik
                initialValues={{ createdAt: '', minDate: '', maxDate: '', age: '', password: '', conformPassword: '' }}
                enableReinitialize={true}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
                render={(props: FormikProps<any>) => this.renderForm(props)} />
        )
    }
}