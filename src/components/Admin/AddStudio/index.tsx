import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { IStudio, ResponseError } from 'server/interface';
import instance from 'src/api/httpService';
import { object, string } from 'yup';

interface IAddSliderProps {
    studio: IStudioWithImagePlaceholder;
    isAdd: boolean;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddStudio: FC<IAddSliderProps> = ({ studio, setIsAdd, isUpdate }) => {
    const initialValue: IStudio = {
        name: isUpdate ? studio.name : '',
        designation: isUpdate ? studio.designation : '',
        photoUrl: isUpdate ? studio.photoUrl : '',
        alt: isUpdate ? studio.alt : '',
        socialLink: {
            instagram: isUpdate ? studio.socialLink?.instagram : '',
            linkedIn: isUpdate ? studio.socialLink?.linkedIn : '',
        },
    } as IStudio;

    const onSubmitHandler = async (
        values: IStudio,
        formikHelpers: FormikHelpers<IStudio>
    ) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('designation', values.designation);
            formData.append('file', values.photoUrl);
            formData.append('alt', values.alt);
            formData.append(
                'socialLink.instagram',
                values.socialLink.instagram
            );
            formData.append('socialLink.linkedIn', values.socialLink.linkedIn);

            if (isUpdate) {
                const { data } = await instance.patch<{ message: string }>(
                    '/info/studios/' + studio._id,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                toast.success(data.message);
            } else {
                const { data } = await instance.post<{ message: string }>(
                    '/info/studios',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                toast.success(data.message);
            }

            formikHelpers.resetForm();
            window.location.reload();
        } catch (err) {
            const error = err as ResponseError;
            toast.error(error.response?.data?.message);
        }
    };
    return (
        <Formik
            initialValues={initialValue}
            onSubmit={onSubmitHandler}
            validationSchema={object({
                name: string().required(),
                designation: string().required(),
                photoUrl: string().required(),
                alt: string().required(),
                socialLink: object({
                    facebook: string().optional(),
                    instagram: string().optional(),
                    linkedIn: string().optional(),
                }),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue, values }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Full Name
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="name"
                            name="name"
                            placeholder="Full Name"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="name" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="designation" className="form-label">
                            Designation
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="designation"
                            name="designation"
                            placeholder="Designation"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="designation" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alt" className="form-label">
                            Alt Key
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="alt"
                            name="alt"
                            placeholder="Image alt key"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="alt" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photoUrl" className="form-label">
                            Photo
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="photoUrl"
                            name="photoUrl"
                            onChange={(event: any) => {
                                setFieldValue(
                                    'photoUrl',
                                    event.currentTarget.files[0]
                                );
                            }}
                        />
                        {isUpdate && (
                            <Image
                                layout="fixed"
                                className="rounded-1 img-fluid mt-1"
                                src={studio.src}
                                alt={studio.alt}
                                placeholder="blur"
                                blurDataURL={studio.base64}
                                height={50}
                                width={50}
                            />
                        )}
                        {errors.photoUrl && touched.photoUrl && (
                            <div className="text-danger">
                                Photo is a required field
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Instagram" className="form-label">
                            Instagram Url
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="Instagram"
                            value={values.socialLink.instagram}
                            name="socialLink.instagram"
                            placeholder="https://www.instagram.com/yourname/"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="linkedIn" className="form-label">
                            linkedIn Url
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="linkedIn"
                            name="socialLink.linkedIn"
                            value={values.socialLink.linkedIn}
                            placeholder="https://www.linkedin.com/in/yourname/"
                        />
                    </div>
                    <div className="d-flex gap-1 mb-0">
                        <button
                            type="button"
                            className="btn btn-dark btn-sm fs-12"
                            onClick={() => setIsAdd(false)}
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

export default AddStudio;
