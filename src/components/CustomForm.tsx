import React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';


export class CustomForm extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    // public validationSchema = {};

    /**
     * Handles submit
     * @param customer 
     * @param { setSubmitting, resetForm } 
     */
    public handleSubmit(values: any, { setSubmitting, resetForm }: FormikActions<any>): void {
        setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
        }, 2000);

    }

    public renderForm(props: FormikProps<any>): any {
        return (
            <Form>
                <Field type="text" name="name" />
                <button type="submit" disabled={props.isSubmitting}>Hello</button>
            </Form>
        )
    }
    render() {
        return (
            <Formik
                initialValues={{ name: '' }}
                // validationSchema={this.validationSchema}
                enableReinitialize={true}
                onSubmit={this.handleSubmit}
                render={(props: FormikProps<any>) =>
                    this.renderForm(props)
                }
            />
        )
    }
}