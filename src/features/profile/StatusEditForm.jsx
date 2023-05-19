import React, {useState} from 'react';
import {Form, Formik} from "formik";
import CustomInput from "../auth/CustomInput.jsx";
import {useDispatch} from "react-redux";
import {postStatus} from "./profileSlice.js";
import {statusSchema} from "../../utilities/validationSchema.js";

const StatusEditForm = ({isOwner, userStatus}) => {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (formData) => {
        dispatch(postStatus(formData.status)).then(() => {
            setIsEditing(false)
        })
    }

    const handleBlur = (formData) => {
        console.log(formData)
        dispatch(postStatus(formData.target.value)).then(() => {
            setIsEditing(false)
        })
    }

    return (
        <>
            {isEditing ?
                <Formik initialValues={{status: ''}} onSubmit={handleSubmit} validationSchema={statusSchema}>
                    {() => (
                        <Form >
                            <CustomInput onBlur={handleBlur} label={''} name={'status'} type={'text'} placeholder={'Enter your status'} autoFocus/>
                        </Form>
                    )}
                </Formik>
                :
                <p onDoubleClick={() => isOwner && setIsEditing(true)}>{userStatus || 'no status'}</p>}
        </>

    );
};

export default StatusEditForm;