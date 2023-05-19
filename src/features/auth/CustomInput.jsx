import React from 'react';
import {useField} from "formik";

const CustomInput = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return (
        <div className={'flex'}>
            <label className={'capitalize'}>{label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error && <div className={'text-red-500 ml-1'}>{meta.error}</div>}
        </div>
    );
};

export default CustomInput;