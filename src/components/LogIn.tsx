import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Formik, Form, FormikActions, Field, ErrorMessage, FormikProps } from "formik";
import { string, object, number, date } from 'yup';

export class Login extends React.Component<any, any> {
    /**
     * Validation schema of customer form
     */
    public validationSchema = object().shape<any>({
        userId: string().required(),
        password: string().required(),

    });


    constructor(props: any) {
        super(props);
        this.state = { user: { userId: '', password: '' }, redirectToReferrer: false };

    }


    /**
     * Handles submit
     * @param customer 
     * @param { setSubmitting, resetForm } 
     */
    public handleSubmit(values: any, { setSubmitting, resetForm }: FormikActions<any>): void {
        axios.get('http://172.16.3.60:8080/user')
            .then(response => {
                if (response.data[0].userId == values.userId.toLowerCase()) {
                    if (response.data[0].password == values.password) {
                        localStorage.setItem("authToken", values);
                        this.setState({ redirectToReferrer: true });
                    } else {
                        alert('enter valid password');
                    }
                } else {
                    alert('enter valid user id');
                }

            })
    }

    public renderForm(fields: FormikProps<any>): any {
        return (
            <Form>
                <div className="form-group">
                    <label htmlFor="">UserId</label>
                    <Field className="form-control" name="userId" type="text" />
                    <ErrorMessage name="userId" component="div" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <Field className="form-control" name="password" type="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" >Log in</button>
            </Form>

        )
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;
        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <Formik
                    initialValues={this.state.user}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit.bind(this)}
                    render={fields => this.renderForm(fields)}
                />

            </div>
        );
    }
}