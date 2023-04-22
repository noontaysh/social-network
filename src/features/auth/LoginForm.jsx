import React, {useEffect} from 'react';
import {Form, Formik} from "formik";
import CustomInput from "./CustomInput.jsx";
import {loginSchema} from "../../utilities/validationSchema.jsx";
import CustomCheckbox from "./CustomCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {getAuthenticationError, getAuthStatus, getCustomerId, getLogged} from "./authSlice.js";
import {Navigate} from "react-router-dom";

const LoginForm = (props) => {
    const dispatch = useDispatch()

    const error = useSelector(getAuthenticationError)

    const handleSubmit = (formData, {resetForm}) => {
        dispatch(getLogged({...formData}))
        resetForm()
    }
    return (
        <>
            <Formik initialValues={{email: '', password: '', rememberMe: false}} validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
                {(props) => (
                    <Form>
                        <CustomInput label={'Email'} name={'email'} type={'text'} placeholder={'Enter your email'}/>
                        <CustomInput label={'Password'} name={'password'} type={'password'}
                                     placeholder={'Enter your password'}/>
                        <CustomCheckbox type={'checkbox'} name={'rememberMe'}/>
                        <div>{error}</div>
                        <button type={"submit"} disabled={props.isSubmitting}>login</button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;