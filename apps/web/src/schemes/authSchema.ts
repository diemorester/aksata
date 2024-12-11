import * as yup from 'yup'
import yuppassword from 'yup-password'

yuppassword(yup)

export const RegisterSchema = yup.object().shape({
    name: yup.string().required('name cannot be empty'),
    email: yup.string().required('email cannot be empty').email('email format is not valid'),
    password: yup.string().required('password cannot be empty').min(6, 'password must be at least 6 characters').max(15, 'password must not exceed 15 characters')
})

export const loginSchema = yup.object().shape({
    email: yup.string().required('email cannot be empty').email('email format is not valid'),
    password: yup.string().required('password cannot be empty').min(6, 'must be at least 6 characters').max(15, 'must not exceed 15 characters')
})

export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().required('email cannot be empty').email('email format is not valid')
})

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('password cannot be empty').min(6, 'password must be at least 6 characters').max(15, 'password must not exceed 15 characters'),
    confirmPassword: yup.string().required('password cannot be empty').oneOf([yup.ref('password')], 'password does not match')
})

export const changePasswordSchema = yup.object().shape({
    oldpass: yup.string().required('current password is required').min(6, 'password must be at least 6 characters').max(15, 'password must not exceed 15 characters'),
    newpass: yup.string().required('new password cannot be empty').min(6, 'new password must be at least 6 characters').max(15, 'new password must not exceed 15 characters'),
    confirmpass: yup.string().required('confirm password cannot be empty').oneOf([yup.ref('newpass')], 'password does not match')
})