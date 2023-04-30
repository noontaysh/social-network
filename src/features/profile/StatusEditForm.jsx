import React from 'react';
import {Form, Formik} from "formik";
import CustomInput from "../auth/CustomInput.jsx";
import {loginSchema} from "../../utilities/validationSchema.js";
import {getLogged} from "../auth/authSlice.js";
import {useDispatch} from "react-redux";
import {postStatus} from "./profileSlice.js";

const StatusEditForm = ({setIsEditing}) => {
    const dispatch = useDispatch()

    const handleSubmit = (formData, {resetForm}) => {
        console.log(formData)
        // resetForm()
    }

    const handleBlur = (formData) => {
        setIsEditing(false)
        dispatch(postStatus(formData.target.value))
    }

    return (
        <Formik initialValues={{status: ''}}
                onSubmit={handleSubmit}>
            {(props) => (
                <Form onBlur={(e) => handleBlur(e)} >
                    <CustomInput label={''} name={'status'} type={'text'} placeholder={'Enter your status'} />
                </Form>
            )}
        </Formik>
    );
};

export default StatusEditForm;