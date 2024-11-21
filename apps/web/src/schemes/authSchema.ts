import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
    name: yup.string().required('name cannot be empty'),
    email: yup.string().required('email cannot be empty').email('email format is not valid'),
    password: yup.string().required('password cannot be empty').min(6, 'password must be more than 6 characters').max(15, 'password cannot be more than 15 characters')
})