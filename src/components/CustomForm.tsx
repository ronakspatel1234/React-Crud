import React from 'react';
import { Formik, FormikProps, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';


export class CustomForm extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    /**
    * Validation schema of customer form
    */
    public validationSchema: yup.ObjectSchema<yup.Shape<{}, any>> = yup.object().shape<any>({

    });

    // public validationSchema = {};

    // /**
    //  * Handles submit
    //  * @param customer 
    //  * @param { setSubmitting, resetForm } 
    //  */
    // public handleSubmit(values: any, { setSubmitting, resetForm }: FormikActions<any>): void {
    //     // setTimeout(() => {
    //     setSubmitting(false);
    //     alert(JSON.stringify(values, null, 2));
    //     // }, 400);

    // }

    // public renderFirstForm(props: FormikProps<any>): any {
    //     return (
    //         <Form>
    //             <div className="form-group">
    //                 <label htmlFor="">Organization Name</label>
    //                 <Field className="form-control" type="text" name="organizationName" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="">TechnologyList</label>
    //                 <FieldArray name="technologyList"
    //                     render={arrayHelpers => (
    //                         <div>
    //                             {props.values.technologyList && props.values.technologyList.length > 0 ?
    //                                 (
    //                                     props.values.technologyList.map((technology: string, index: number) => (
    //                                         <div key={index}>
    //                                             <Field className="form-control" name={`technologyList.${index}`} />
    //                                             <button type="button" onClick={() => arrayHelpers.remove(index)} >-</button>
    //                                             <button type="button" onClick={() => arrayHelpers.insert(index, "")} >+</button>
    //                                         </div>
    //                                     ))
    //                                 )
    //                                 : (<button type="button" onClick={() => arrayHelpers.push("")}>Add a technology</button>)}
    //                         </div>
    //                     )}
    //                 />
    //             </div>
    //             <button type="submit" disabled={props.isSubmitting}>Hello</button>
    //         </Form>
    //     )
    // }

    render() {
        return (
            <div >
                <Formik
                    initialValues={{ organizationName: '', technologyList: ["java", "angular", "react"], firstForm: { address: {} } }}
                    validationSchema={yup.object().shape({
                        organizationName: yup.string().required().min(2),
                        technologyList: yup.array().required(),
                        firstForm: yup.object().shape({
                            address: yup.string().required(),
                            organizationName: yup.string().required(),
                        })
                    })}
                    enableReinitialize={true}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        alert(JSON.stringify(values, null, 2))
                    }}
                    render={(props: FormikProps<any>) =>
                        <div >
                            <h3>Main Form</h3>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="">Organization Name</label>
                                    <Field className="form-control" type="text" name="organizationName" />
                                    <ErrorMessage name="organizationName"  component="p" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">TechnologyList</label>
                                    <FieldArray name="technologyList"
                                        render={arrayHelpers => (
                                            <div>
                                                {props.values.technologyList && props.values.technologyList.length > 0 ?
                                                    (
                                                        props.values.technologyList.map((technology: string, index: number) => (
                                                            <div key={index}>
                                                                <Field type="text" className="form-control" name={`technologyList.${index}`} />
                                                                <button type="button" onClick={() => arrayHelpers.remove(index)} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                                                                <button type="button" onClick={() => arrayHelpers.insert(index, "")} ><i className="fa fa-plus" aria-hidden="true"></i></button>
                                                            </div>
                                                        ))
                                                    )
                                                    : (<button type="button" onClick={() => arrayHelpers.push("")}>Add a technology</button>)}
                                            </div>
                                        )}
                                    />
                                    <ErrorMessage name="technologyList" component="p" />
                                </div>
                                <button type="submit" >Last submit</button>
                            </Form>
                            <Formik
                                initialValues={{ organizationName: '' }}
                                validationSchema={yup.object().shape({ organizationName: yup.string().required().min(2) })}
                                onSubmit={(values, actions) => {
                                    props.setFieldValue("firstForm", values)
                                }
                                }
                                render={firstForm => (
                                    <div >
                                        <h3>second Form</h3>
                                        <Form >
                                            <Field type="text" name="organizationName" />
                                            <ErrorMessage name="organizationName" component="p" />
                                            <button type="button" onClick={firstForm.submitForm}>Second Submit</button>
                                        </Form>
                                        <Formik
                                            initialValues={{ street1: '', street2: '' }}
                                            validationSchema={yup.object().shape({ street1: yup.string().required(), street2: yup.string().required() })}
                                            onSubmit={(values, actions) => {
                                                firstForm.setFieldValue(
                                                    "address",
                                                    `${values.street1}, ${values.street2}`
                                                );
                                            }}
                                            render={secondForm => (
                                                <div>
                                                    <h3>First Form</h3>
                                                    <Form >
                                                        <strong>Address Subform</strong>
                                                        <br />
                                                        <Field type="text" name="street1" /><br/>
                                                        <ErrorMessage name="street1" component="p" />
                                                        <Field type="text" name="street2" />
                                                        <ErrorMessage name="street2" component="p" />
                                                        <button type="button" onClick={secondForm.submitForm}>First Submit</button>
                                                    </Form>
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    }
                />
            </div>
        )
    }
}
