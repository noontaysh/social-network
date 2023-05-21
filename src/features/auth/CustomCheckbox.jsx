import React from 'react';
import {useField} from "formik";

const CustomCheckbox = ({...props}) => {
    const [field, meta] = useField(props)

    return (
        <label>
            <span className={'text-lg mr-2 text-slate-100'}>Remember me</span>
            <input {...field} {...props} className={'scale-110 cursor-pointer'}/>
            {meta.touched && meta.error && <div>{meta.error}</div>}
        </label>
    );
};

export default CustomCheckbox;