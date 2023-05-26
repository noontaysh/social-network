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
        <div className={'pl-4'}>
            <Formik enableReinitialize initialValues={{
                aboutMe: `${props.aboutMe}`,
                contacts: {...props.contacts},
                lookingForAJob: props.lookingForAJob,
                lookingForAJobDescription: `${props.lookingForAJobDescription}`,
                fullName: `${props.fullName}`
            }} onSubmit={handleSubmit} validationSchema={profileSchema}>
                {() => (
                    <Form className={'leading-6'}>
                        <CustomInput label={'Full name: '} name={'fullName'} type={'text'} placeholder={'Your Name'} className={'mb-1 ml-1 px-1 outline-none'}/>
                        <CustomInput label={'About me: '} name={'aboutMe'} type={'text'} placeholder={'About You'} className={'mb-1 px-1 ml-1 outline-none'}/>
                        <CustomInput label={'Skills: '} name={'lookingForAJobDescription'} type={'text'} placeholder={'Your skills'} className={'mb-1 ml-1 px-1 outline-none'}/>
                        <CustomInput label={'Looking for a job: '} name={'lookingForAJob'} type={'checkbox'} className={'mb-1 outline-none'}/>
                        {Object.keys(props.contacts).map(key => {
                            return (
                                <CustomInput key={key} label={`${key}: `} name={`contacts.${key}`} type={'text'} placeholder={`Your url`} className={'mb-1 ml-1 px-1 outline-none'}/>
                            )
                        })}
                        <button type={"submit"} className={'bg-slate-200 py-1 mt-2 px-6 rounded-md text-black uppercase tracking-wider text-sm hover:opacity-70 ease-in duration-300'}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileEditForm;