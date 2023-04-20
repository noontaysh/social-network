import React from 'react';
import {Form, Formik} from "formik";
import CustomInput from "./CustomInput.jsx";
import {loginSchema} from "../../utilities/validationSchema.jsx";
import CustomCheckbox from "./CustomCheckbox";

const LoginForm = (props) => {
    const onSubmit = () => {

    }
    return (
        <Formik initialValues={{email: '', password: '', rememberMe: false}} validationSchema={loginSchema} onSubmit={onSubmit}>
            {(props) => (
                <Form>
                    <CustomInput label={'Email'} name={'email'} type={'text'} placeholder={'Enter your email'}/>
                    <CustomInput label={'Password'} name={'password'} type={'password'} placeholder={'Enter your password'}/>
                    <CustomCheckbox type={'checkbox'} name={'rememberMe'} />
                    <button type={"submit"} disabled={props.isSubmitting}>login</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;