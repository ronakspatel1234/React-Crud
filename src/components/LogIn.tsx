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
        email: string().required(),
        password: string().required(),

    });


    constructor(props: any) {
        super(props);
        this.state = { user: { email: '', password: '' }, redirectToReferrer: false };

    }


    /**
     * Handles submit
     * @param customer 
     * @param { setSubmitting, resetForm } 
     */
    public handleSubmit(values: any, { setSubmitting, resetForm }: FormikActions<any>): void {
        axios.post('http://172.16.3.60:8080/auth/login', values, {
            headers: {

                'Authorization': 'Bearer'
            }
        })
            .then(response => {
                console.log(response);
                localStorage.setItem("access_token", response.data.access_token);
                this.setState({ redirectToReferrer: true });
            }).catch(response => {
                console.log(response);

            })
    }

    public renderForm(fields: FormikProps<any>): any {
        return (
            <Form>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <Field className="form-control" name="email" type="text" />
                    <ErrorMessage name="email" component="div" />
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