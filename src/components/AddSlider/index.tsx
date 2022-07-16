import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { ISlider, ResponseError } from 'server/interface';
import { object, string } from 'yup';

interface IAddSliderProps {
    isAddSlider: boolean;
    setIsAddSlider: Dispatch<SetStateAction<boolean>>;
}

const AddSlider: FC<IAddSliderProps> = ({ setIsAddSlider }) => {
    const initialValue: ISlider = {
        alt: '',
        photoUrl: '',
    } as ISlider;

    const onSubmitHandler = async (
        values: ISlider,
        formikHelpers: FormikHelpers<ISlider>
    ) => {
        try {
            const formData = new FormData();
            formData.append('alt', values.alt);
            formData.append('file', values.photoUrl);

            const { data } = await axios.post<{
                message: string;
                data: ISlider;
                success: true;
            }>('/sliders', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(data.message);
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
