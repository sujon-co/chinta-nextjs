import axios from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { IAdmin, ResponseError } from 'server/interface';
import { boolean, object, string } from 'yup';

interface Props {}

interface ISignInForm extends IAdmin {
    passwordRemember: boolean;
}

const SignIn: NextPage<Props> = () => {
    const initialValue: ISignInForm = {
        email: '',
        password: '',
        passwordRemember: false,
    } as ISignInForm;

    const onSubmitHandler = async (
        values: ISignInForm,
        formikHelpers: FormikHelpers<ISignInForm>
    ) => {
        try {
            const { data } = await axios.post('/admin/login', values);
            toast.success(data.message);
            formikHelpers.setSubmitting(false);
            Router.push('/admin/chinta');
        } catch (err) {
            const error = err as ResponseError;
            toast.error(error.response?.data?.message);
            formikHelpers.setSubmitting(false);
        }
    };
    return (
        <section className="form-signin w-100 m-auto">
            <Formik
                validationSchema={object({
                    email: string()
                        .email()
                        .required()
                        .test(
                            'Validate Email',
                            'Please Provide a Valid Email Address',
                            (value) => {
                                const re =
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                return re.test(String(value).toLowerCase());
                            }
                        ),
                    password: string().required('No password provided.'),
                    passwordRemember: boolean().optional(),
                })}
                initialValues={initialValue}
                onSubmit={onSubmitHandler}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form className="login-form needs-validation noValidate">
                        <div className="text-center mb-3">
                            <Image
                                src="/logo.svg"
                                alt="brand logo"
                                layout="fixed"
                                height={60}
                                width={56}
                            />
                        </div>
                        <h1 className="h5 mb-3 fw-normal text-center text-uppercase ">
                            Dashboard Login
                        </h1>
                        <div className="form-floating mb-2">
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                className={`form-control form-control-sm  ${
                                    touched.email && errors.email
                                        ? 'is-invalid'
                                        : ''
                                }`}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating">
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                className={`form-control form-control-sm  ${
                                    touched.password && errors.password
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                placeholder="Password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="checkbox my-3">
                            <label className="d-flex gap-1">
                                <Field
                                    type="checkbox"
                                    name="passwordRemember"
                                />{' '}
                                <span>Remember me</span>
                            </label>
                        </div>
                        {!isSubmitting && (
                            <button
                                className="w-100 btn btn-lg btn-dark"
                                type="submit"
                            >
                                Sign in
                            </button>
                        )}
                        {isSubmitting && (
                            <button
                                className="w-100 btn btn-lg btn-dark opacity-75 d-flex gap-2 justify-content-center align-items-center disabled"
                                type="submit"
                            >
                                <div
                                    className="spinner-border text-white spinner-style"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...{' '}
                                    </span>
                                </div>
                                <span>Loading...</span>
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </section>
    );
};
export default SignIn;
