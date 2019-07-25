import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Formik, Form, FormikActions, Field, ErrorMessage, FormikProps } from "formik";
import { string, object } from 'yup';
import enCommonResource from '../locales/en/common.json';
import frCommonResource from '../locales/fr/common.json';
import { withTranslation, Trans } from "react-i18next";
import i18n from "../i18n.js";

export class Login extends React.Component<any, any> {
    public i18n: any;

    /**
     * Validation schema of customer form
     */
    public validationSchema() {
        return object().shape<any>({
            email: string().required(),
            password: string().required(),
        });
    }

    constructor(props: any) {
        super(props);
        this.props.i18n.addResourceBundle('en', 'common', enCommonResource, true)
        this.props.i18n.addResourceBundle('fr', 'common', frCommonResource, true)
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

        // {fields.errors.email =  fields.errors.email ? i18n.t('COMMON.ERROR_MSG.EMAIL'): undefined }
        // {fields.errors.password = fields.errors.password ? i18n.t('COMMON.ERROR_MSG.PASSWORD'): undefined }
        return (
            <Form>
                <div className="form-group">
                    <label htmlFor="">{i18n.t('COMMON.LABEL.EMAIL')}</label>
                    <Field className="form-control" name="email" type="text" />
                    {fields.errors.email && fields.touched.email ? (
                        <div>{i18n.t('COMMON.ERROR_MSG.EMAIL')}</div>
                      ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor=""><Trans>COMMON.LABEL.PASSWORD</Trans></label>
                    <Field className="form-control" name="password" type="password" />
                    {fields.errors.password && fields.touched.password ? (
                        <div>{i18n.t('COMMON.ERROR_MSG.PASSWORD')}</div>
                      ) : null}
                </div>
                <button type="submit" >{i18n.t('COMMON.LABEL.LOGIN')}</button>
            </Form>

        )
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;
        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>
                    <Trans i18nKey="COMMON.INFO">
                        {{pathName: from.pathname}}
                    </Trans>
                </p>
                <Formik
                    initialValues={this.state.user}
                    validationSchema={this.validationSchema.bind(this)}
                    onSubmit={this.handleSubmit.bind(this)}
                    render={fields => this.renderForm(fields)}
                />

            </div>
        );
    }
}

// i18n.addResourceBundle('en', 'translations', enCommonResource, true)
// i18n.addResourceBundle('fr', 'translations', frCommonResource, true)
withTranslation('translations')(Login);