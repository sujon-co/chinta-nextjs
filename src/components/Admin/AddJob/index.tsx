import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { ErrorResponse, isAxiosError } from 'server/helpers/error';
import { IJob } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import CKEditor from 'src/components/CkEditor/CkEditor';
import MyImage from 'src/components/Image';
import { object, string } from 'yup';

interface IAddSliderProps {
    job: IJob;
    setIsUpdate: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddJob: FC<IAddSliderProps> = ({ setIsUpdate, isUpdate, job }) => {
    const initialValue: IJob = {
        title: job.title,
        description: job.description,
        image: job.image,
        opportunity: job.opportunity,
    } as IJob;


    const onSubmitHandler = async (
        values: IJob,
        formikHelpers: FormikHelpers<IJob>
    ) => {


        try {
            const formData = new FormData();
            formData.append('name', 'job-image');
            let imageUrl = '';

            if (typeof values.image === 'string') {
                imageUrl = values.image;
            } else {
                formData.append('image', values.image);
                formData.append('path', job.image);
                const { data: _imageUrl } = await imageUploadInstance.patch('/upload/image', formData);
                imageUrl = _imageUrl.data;
            }


            const _job: IJob = {
                ...values,
                image: imageUrl
            };

            const { data } = await instance.patch<{ message: string; }>(`/info/jobs/${job._id}`, _job);
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
                title: string().required('Title is required'),
                description: string().required('Description is required'),
                opportunity: string().required('Opportunity link is required'),
                image: string().required(),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="mb-3">

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Job Title
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="title"
                            name="title"
                            placeholder="Add Job Title"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="title" />
                        </div>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="opportunity" className="form-label">
                            Opportunity
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="opportunity"
                            name="opportunity"
                            placeholder="Add Opportunity link"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="opportunity" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <CKEditor
                            value={job.description}
                            fieldName="description"
                            setFieldValue={setFieldValue}
                        />

                        <div className="text-danger">
                            <ErrorMessage name="description" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="image"
                            name="image"
                            onChange={(event: any) => {
                                setFieldValue(
                                    'image',
                                    event.currentTarget.files[0]
                                );
                            }}
                        />
                        {isUpdate && (
                            <MyImage
                                layout="fixed"
                                className=" img-fluid mt-1"
                                src={job.image}
                                alt={job.title}
                                placeholder="blur"
                                height={60}
                                width={65}
                                objectFit="cover"
                                preloader={false}
                            />
                        )}
                        {errors.image && touched.image && (
                            <div className="text-danger">
                                Image is a required field
                            </div>
                        )}
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

export default AddJob;
