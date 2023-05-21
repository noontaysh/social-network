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
        <div className={'m-auto p-8 bg-indigo-800 w-1/4 rounded-lg mt-24'}>
            <Formik initialValues={{email: '', password: '', rememberMe: false, captcha: ''}} validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
                {(props) => (
                    <Form className={''}>
                        <h1 className={'text-center text-2xl mb-4'}>Login</h1>
                        <CustomInput label={''} name={'email'} type={'text'} placeholder={'Enter your email'} className={'mb-4 ease-in-out duration-300 focus:border-teal-700 outline-0 p-4 border-0 bg-transparent border-b-2 border-white border-solid'}/>
                        <CustomInput label={''} name={'password'} type={'password'} placeholder={'Enter your password'} className={'mb-4 ease-in-out duration-300 focus:border-teal-700 outline-0 p-4 border-0 bg-transparent border-b-2 border-white border-solid'}/>
                        <div className={'my-1 text-red-600'}>{error}</div>
                        <CustomCheckbox label={''} type={'checkbox'} name={'rememberMe'} />
                        {captchaUrl ? <Captcha captchaUrl={captchaUrl}/> : ''}
                        <div className={'text-center'}>
                            <button type={"submit"} disabled={props.isSubmitting} className={'px-12 py-3 mt-4 hover:opacity-75 ease-in-out duration-300 uppercase bg-cyan-700 rounded-xl tracking-wide'}>login</button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;