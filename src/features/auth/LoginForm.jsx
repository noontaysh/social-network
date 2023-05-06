import React, {useEffect} from 'react';
import {Form, Formik} from "formik";
import CustomInput from "./CustomInput.jsx";
import {loginSchema} from "../../utilities/validationSchema.js";
import CustomCheckbox from "./CustomCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {getAuthenticationError, getCaptchaUrl, getLogged} from "./authSlice.js";
import Captcha from "./Captcha.jsx";

const LoginForm = (props) => {
    const dispatch = useDispatch()

    const error = useSelector(getAuthenticationError)
    const captchaUrl = useSelector(getCaptchaUrl)

    const handleSubmit = (formData, {resetForm}) => {
        dispatch(getLogged({...formData})).then(() => {
            resetForm()
        })
    }
    return (
        <>
            <Formik initialValues={{email: '', password: '', rememberMe: false, captcha: ''}} validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
                {(props) => (
                    <Form>
                        <CustomInput label={'Email'} name={'email'} type={'text'} placeholder={'Enter your email'}/>
                        <CustomInput label={'Password'} name={'password'} type={'password'} placeholder={'Enter your password'}/>
                        <CustomCheckbox type={'checkbox'} name={'rememberMe'}/>
                        <div>{error}</div>
                        {captchaUrl ? <Captcha captchaUrl={captchaUrl} /> : ''}
                        <button type={"submit"} disabled={props.isSubmitting}>login</button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;