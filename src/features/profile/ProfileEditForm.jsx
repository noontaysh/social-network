import React from 'react';
import {Form, Formik} from "formik";
import CustomInput from "../auth/CustomInput.jsx";

const ProfileEditForm = ({setIsEditing, ...props}) => {

    const handleSubmit = (formData) => {
        setIsEditing(false)
        console.log(formData)
    }

    return (
        <Formik initialValues={{fullName: '', lookingForAJob: false, }} onSubmit={handleSubmit}>
            {() => (
                <Form>
                    <CustomInput label={'Full name'} name={'fullName'} type={'text'} placeholder={'Enter your Name'}/>
                    <CustomInput label={'Looking for a job'} name={'lookingForAJob'} type={'checkbox'}/>
                    {Object.keys(props.contacts).map(key => {
                        return (
                            <CustomInput key={key} label={`${key}:`} name={key} type={'text'} placeholder={`Enter your url to ${key}`}/>
                        )
                    })}
                    <button type={"submit"}>Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileEditForm;