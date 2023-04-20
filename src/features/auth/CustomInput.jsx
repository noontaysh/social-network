import React from 'react';
import {useField} from "formik";

const CustomInput = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return (
        <div>
            <label>{label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error && <div>{meta.error}</div>}
        </div>
    );
};

export default CustomInput;