import * as yup from 'yup';
import {IUser,roleEnum, roles, status,} from '../../types';

const UserValidation:yup.SchemaOf<IUser>= yup.object().shape({
    name:yup.object({
        first_name:yup.string().required('name is required'),
        last_name:yup.string().required(),
    }),
    email:yup.string().email().required('Please enter valid email'),
    age:yup.string().required('age is required'),
    password:yup.string().min(6).required('please enter min 6 char password'),
    role:yup.mixed().oneOf(roles),
    status:yup.mixed().oneOf(status),
    file:yup.object(),
    otp:yup.string().required(),
    created:yup.date().notRequired(),
    updated:yup.date().notRequired(),
    deleted:yup.boolean().notRequired(),
    
});


// const UserValidation = yup.object().shape({
//     name:yup.string().required('name is required'),
//     email:yup.string().email().required('email is required'),
//     age:yup.number().required(),
//     password:yup.string().min(6).required('password is required')
// })
// module.exports = UserValidation
export {UserValidation}

