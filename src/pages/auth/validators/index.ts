import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    emph: Yup.string().required(),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
});

export const changePassValidationSchema = Yup.object().shape({
    current_password: Yup.string().required('Current Password is required'),
    new_password: Yup.string()
        .required('New Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'New Password & Confirm Password must match')
        .required('Confirm Password is required')
});

export const loginValidationSchema = Yup.object().shape({
    emph: Yup.string().required(),
    password: Yup.string()
        .required('Password is required')
});
