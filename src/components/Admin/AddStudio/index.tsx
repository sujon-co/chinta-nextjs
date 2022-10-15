import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { APIResponse, IStudio, ResponseError } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import MyImage from 'src/components/Image';
import { number, object, string } from 'yup';

interface IAddSliderProps {
    studio: IStudio;
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
        position: isUpdate ? studio.position : 100,
        socialLink: {
            instagram: isUpdate ? studio.socialLink?.instagram : '',
            linkedIn: isUpdate ? studio.socialLink?.linkedIn : '',
            website: isUpdate ? studio.socialLink?.website : '',
        },
    } as IStudio;


    const onSubmitHandler = async (
        values: IStudio,
        formikHelpers: FormikHelpers<IStudio>
    ) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);

            if (isUpdate) {
                let _photoUrl = "";

                if (typeof values.photoUrl === 'string') {
                    _photoUrl = values.photoUrl;
                } else {
                    formData.append('image', values.photoUrl);
                    formData.append('path', studio.photoUrl);
                    const { data: imageUrl } = await imageUploadInstance.patch('/upload/image', formData);

                    _photoUrl = imageUrl.data;
                }

                const _studio: IStudio = {
                    ...values,
                    photoUrl: _photoUrl
                };
                const { data } = await instance.patch<APIResponse<IStudio>>('/info/studios/' + studio._id, _studio);

                if (data.message) {
                    toast.success(data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                const { data: imageUrl } = await imageUploadInstance.post('/upload/image', formData);
                const studio: IStudio = {
                    ...values,
                    photoUrl: imageUrl.data,
                };
                const { data } = await instance.post<{ message: string; }>('/info/studios', studio);

                if (data.message) {
                    toast.success(data.message);
                    formikHelpers.resetForm();
                    window.location.reload();
                }
            }



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
                name: string().required('Name is required'),
                designation: string().required('Designation is required'),
                photoUrl: string().required('Photo is required'),
                alt: string().required(),
                position: number().required(),
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
                        <label htmlFor="position" className="form-label">
                            Position Number (Rank)
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="position"
                            name="position"
                            placeholder="Position Number"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="position" />
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
                            accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg"
                            onChange={(event: any) => {
                                setFieldValue(
                                    'photoUrl',
                                    event.currentTarget.files[0]
                                );
                            }}
                        />
                        {isUpdate && (
                            <MyImage
                                layout="fixed"
                                className="rounded-1 img-fluid mt-1"
                                src={studio.photoUrl}
                                alt={studio.alt}
                                placeholder="blur"
                                height={100}
                                width={80}
                                preloader={false}
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
                    <div className="mb-3">
                        <label htmlFor="website" className="form-label">
                            Website Url
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="website"
                            name="socialLink.website"
                            value={values.socialLink.website}
                            placeholder="https://www.website.com"
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
