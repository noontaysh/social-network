import React from 'react';
import {Form, Formik} from "formik";
import CustomInput from "../auth/CustomInput.jsx";
import {useDispatch} from "react-redux";
import {updateProfile} from "./profileSlice.js";

const ProfileEditForm = ({setIsEditing, ...props}) => {
    const dispatch = useDispatch()

        console.log(props)
    const handleSubmit = (formData) => {
        setIsEditing(false)
        dispatch(updateProfile(formData))
    }

    return (
        <Formik enableReinitialize initialValues={{aboutMe: `${props.aboutMe}`, contacts: {...props.contacts}, lookingForAJob: props.lookingForAJob, lookingForAJobDescription: `${props.lookingForAJobDescription}` , fullName: `${props.fullName}`}} onSubmit={handleSubmit}>
            {() => (
                <Form>
                    <CustomInput label={'Full name'} name={'fullName'} type={'text'} placeholder={'Enter your Name'}/>
                    <CustomInput label={'About me'} name={'aboutMe'} type={'text'} placeholder={'Tell smth about yourself'} />
                    <CustomInput label={'Skills'} name={'lookingForAJobDescription'} type={'text'} placeholder={'Your personal skills'} />
                    <CustomInput label={'Looking for a job'} name={'lookingForAJob'} type={'checkbox'}/>
                    {Object.keys(props.contacts).map(key => {
                        return (
                            <CustomInput key={key} label={`${key}:`} name={`contacts.${key}`} type={'text'} placeholder={`Enter your url to ${key}`}/>
                        )
                    })}
                    <button type={"submit"}>Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileEditForm;