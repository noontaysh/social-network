import * as yup from 'yup'


export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
    rememberMe: yup
        .boolean()
})

export const statusSchema = yup.object().shape({
    status: yup
        .string()
        .min(3, 'Status must include at least least 3 characters')
})

export const profileSchema = yup.object().shape({
    aboutMe: yup
        .string()
        .required('Field is required'),
    fullName: yup
        .string()
        .required('Field is required'),
    lookingForAJobDescription: yup
        .string()
        .required('Field is required'),
    lookingForAJob: yup
        .string()
})