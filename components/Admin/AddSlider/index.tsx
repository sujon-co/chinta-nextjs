import instance from 'api/httpService';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import { ISliderPlaceholder } from 'pages/admin/chinta/sliders';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { ISlider, ResponseError } from 'server/interface';
import { object, string } from 'yup';

interface IAddSliderProps {
    slider: ISliderPlaceholder;
    isAddSlider: boolean;
    setIsAddSlider: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddSlider: FC<IAddSliderProps> = ({
    setIsAddSlider,
    isUpdate,
    slider,
}) => {
    const initialValue: ISlider = {
        alt: isUpdate ? slider.alt : '',
        photoUrl: isUpdate ? slider.photoUrl : '',
    } as ISlider;

    const onSubmitHandler = async (
        values: ISlider,
        formikHelpers: FormikHelpers<ISlider>
    ) => {
        try {
            const formData = new FormData();
            formData.append('alt', values.alt);
            formData.append('file', values.photoUrl);

            if (isUpdate) {
                const { data } = await instance.patch<{ message: string }>(
                    'sliders/' + slider._id,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                if (data.message) {
                    toast.success(data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                const { data } = await instance.post<{ message: string }>(
                    '/sliders',
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                if (data.message) {
                    toast.success(data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }

            formikHelpers.resetForm();
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
                alt: string().required(),
                photoUrl: string().required(),
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
                            placeholder="image alt key"
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
                                src={slider.src}
                                alt={slider.alt}
                                placeholder="blur"
                                blurDataURL={slider.base64}
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
                    <div className="d-flex gap-1 mb-0">
                        <button
                            type="button"
                            className="btn btn-dark btn-sm fs-12"
                            onClick={() => setIsAddSlider(false)}
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

export default AddSlider;
