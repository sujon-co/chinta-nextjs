import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { ErrorResponse, isAxiosError } from 'server/helpers/error';
import { IContact } from 'server/interface';
import instance from 'src/api/httpService';
import { object, string } from 'yup';

interface IAddContactProps {
    contact: IContact;
    setIsUpdate: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddContact: FC<IAddContactProps> = ({ setIsUpdate, isUpdate, contact }) => {
    const initialValue: IContact = {
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
    } as IContact;


    const onSubmitHandler = async (
        values: IContact,
        formikHelpers: FormikHelpers<IContact>
    ) => {
        try {

            console.log({ values });
            return null;


            const { data } = await instance.patch<{ message: string; }>('/contact', values);
            if (data.message) {
                toast.success(data.message);
                formikHelpers.resetForm();
                window.location.reload();
            }

        } catch (err) {
            if (!isAxiosError<ErrorResponse>(err) || !err.response) {
                throw err;
            }

            toast.error(err.response.data.message);
        }
    };
    return (
        <Formik
            initialValues={initialValue}
            onSubmit={onSubmitHandler}
            validationSchema={object({
                phone: string().required(),
                email: string().required(),
                address: string().required(),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone Number
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="phone"
                            name="phone"
                            placeholder="Enter Phone number"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="phone" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="email"
                            name="email"
                            placeholder="Enter Email Address"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="address"
                            name="address"
                            placeholder="Enter Address"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="address" />
                        </div>
                    </div>

                    <div className="d-flex gap-1 mb-0">
                        <button
                            type="button"
                            className="btn btn-dark btn-sm fs-12"
                            onClick={() => setIsUpdate(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success btn-sm fs-12"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddContact;
