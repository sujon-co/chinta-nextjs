import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { ErrorResponse, isAxiosError } from 'server/helpers/error';
import { IAbout } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import CKEditor from 'src/components/CkEditor/CkEditor';
import MyImage from 'src/components/Image';
import { object, string } from 'yup';

interface IAddSliderProps {
    about: IAbout;
    setIsUpdate: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AboutForm: FC<IAddSliderProps> = ({ setIsUpdate, isUpdate, about }) => {
    const initialValue: IAbout = {
        photoUrl: about.photoUrl,
        bio: about.bio,
        alt: about.alt,
        _id: about._id,
    } as IAbout;


    const onSubmitHandler = async (
        values: IAbout,
        formikHelpers: FormikHelpers<IAbout>
    ) => {
        try {
            const formData = new FormData();
            formData.append('image', values.photoUrl);

            let imageUrl = '';

            if (typeof values.photoUrl === 'string') {
                imageUrl = values.photoUrl;
            } else {
                formData.append('path', values.photoUrl);
                const { data: _imageUrl } = await imageUploadInstance.patch('/upload/image', formData);
                imageUrl = _imageUrl.data;
            }

            const about: IAbout = {
                ...values,
                photoUrl: imageUrl
            };

            const { data } = await instance.patch<{ message: string; }>('/info/about', about);
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
                alt: string().required(),
                photoUrl: string().required(),
                bio: string().required(),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="mb-3">
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
                            <MyImage
                                layout="fixed"
                                className=" img-fluid mt-1"
                                src={about.photoUrl}
                                alt={about.alt}
                                placeholder="blur"
                                height={80}
                                width={65}
                            />
                        )}
                        {errors.photoUrl && touched.photoUrl && (
                            <div className="text-danger">
                                Photo is a required field
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                            Bio
                        </label>
                        <CKEditor
                            value={about.bio}
                            fieldName="bio"
                            setFieldValue={setFieldValue}
                        />

                        <div className="text-danger">
                            <ErrorMessage name="bio" />
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

export default AboutForm;
