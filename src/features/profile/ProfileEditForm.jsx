import React from 'react';
import {Form, Formik} from "formik";
import CustomInput from "../auth/CustomInput.jsx";
import {useDispatch} from "react-redux";
import {updateProfile} from "./profileSlice.js";
import {profileSchema} from "../../utilities/validationSchema.js";

const ProfileEditForm = ({setIsEditing, ...props}) => {
    const dispatch = useDispatch()

    const handleSubmit = (formData) => {
        dispatch(updateProfile(formData)).then(() => {
            setIsEditing(false)
        })
    }

    return (
        <Formik enableReinitialize initialValues={{aboutMe: `${props.aboutMe}`, contacts: {}, lookingForAJob: props.lookingForAJob, lookingForAJobDescription: `${props.lookingForAJobDescription}` , fullName: `${props.fullName}`}} onSubmit={handleSubmit} validationSchema={profileSchema}>
            {() => (
                <Form>
                    <CustomInput label={'Full name'} name={'fullName'} type={'text'} placeholder={'Your Name'}/>
                    <CustomInput label={'About me'} name={'aboutMe'} type={'text'} placeholder={'About You'} />
                    <CustomInput label={'Skills'} name={'lookingForAJobDescription'} type={'text'} placeholder={'Your skills'} />
                    <CustomInput label={'Looking for a job'} name={'lookingForAJob'} type={'checkbox'}/>
                    {Object.keys(props.contacts).map(key => {
                        return (
                            <CustomInput key={key} label={`${key}:`} name={`contacts.${key}`} type={'text'} placeholder={`Your url`}/>
                        )
                    })}
                    <button type={"submit"}>Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileEditForm;