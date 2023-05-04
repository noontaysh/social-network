import React, {useState} from 'react';
import {Form, Formik} from "formik";
import CustomInput from "../auth/CustomInput.jsx";
import {useDispatch} from "react-redux";
import {postStatus} from "./profileSlice.js";

const StatusEditForm = ({isOwner, userStatus}) => {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (formData) => {
        setIsEditing(false)
        !!formData.status && dispatch(postStatus(formData.status))
    }

    const handleBlur = (formData) => {
        setIsEditing(false)
        !!formData.target.value.length && dispatch(postStatus(formData.target.value))
    }

    return (
        <>
            {isEditing ?
                <Formik initialValues={{status: ''}} onSubmit={handleSubmit}>
                    {(props) => (
                        <Form onBlur={(e) => handleBlur(e)}>
                            <CustomInput label={''} name={'status'} type={'text'} placeholder={'Enter your status'} autoFocus/>
                        </Form>
                    )}
                </Formik>
                :
                <p onDoubleClick={() => isOwner && setIsEditing(true)}>{userStatus || '-----'}</p>}
        </>

    );
};

export default StatusEditForm;