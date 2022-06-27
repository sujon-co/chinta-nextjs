import { object, string } from 'yup';

export const adminValidator = object({
    email: string().required().email(),
    password: string().required('Password is required').min(6).max(18),
});
