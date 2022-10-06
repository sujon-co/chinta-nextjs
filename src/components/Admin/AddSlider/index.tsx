import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { APIResponse, ISlider, ResponseError } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import MyImage from 'src/components/Image';
import { object, string } from 'yup';

interface IAddSliderProps {
    slider: ISlider;
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


            if (isUpdate) {
                let _photoUrl = "";

                if (typeof values.photoUrl === 'string') {
                    _photoUrl = values.photoUrl;
                } else {
                    formData.append('image', values.photoUrl);
                    formData.append('path', slider.photoUrl);
                    const { data: imageUrl } = await imageUploadInstance.patch('/upload/image', formData);

                    _photoUrl = imageUrl.data;
                }


                const _slider: ISlider = {
                    ...values,
                    photoUrl: _photoUrl
                };
                const { data } = await instance.patch<APIResponse<ISlider>>('sliders/' + slider._id, _slider);

                if (data.message) {
                    toast.success(data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                formData.append('image', values.photoUrl);

                const { data: imageUrl } = await imageUploadInstance.post('/upload/image', formData);
                const slider: ISlider = {
                    ...values,
                    photoUrl: imageUrl.data,
                };

                const { data } = await instance.post<APIResponse<ISlider[]>>('/sliders', slider);
                if (data.message) {
                    toast.success(data.message);
                    formikHelpers.resetForm();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
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
                alt: string().required(),
                photoUrl: string().required(),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="alt" className="form-label">
                            Title
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="alt"
                            name="alt"
                            placeholder="image title"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="alt" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photoUrl" className="form-label">
                            Photo (Max 3MB)
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
                                className="img-fluid mt-1"
                                src={slider.photoUrl}
                                alt={slider.alt}
                                placeholder="blur"
                                height={80}
                                width={80}
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
