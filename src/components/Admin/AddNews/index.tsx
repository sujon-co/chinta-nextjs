/* eslint-disable @next/next/no-img-element */
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { APIResponse, INews, ResponseError } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import CKEditor from 'src/components/CkEditor/CkEditor';
import MyImage from 'src/components/Image';
import { object, string } from 'yup';

interface IAddNewProps {
    news: INews;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddNews: FC<IAddNewProps> = ({ setIsAdd, isUpdate, news }) => {
    const initialValue: INews = {
        title: isUpdate ? news.title : '',
        url: isUpdate ? news.url : '',
        description: isUpdate ? news.description : '',
        image: isUpdate ? news.image : '',
    } as INews;

    const onSubmitHandler = async (
        values: INews,
        formikHelpers: FormikHelpers<INews>
    ) => {
        try {
            const formData = new FormData();

            if (isUpdate) {
                let _imageUrl = '';
                if (typeof values.image === 'string') {
                    _imageUrl = values.image;
                } else {
                    formData.append('image', values.image);
                    formData.append('path', news.image);
                    const { data: imageUrl } = await imageUploadInstance.patch('/upload/image', formData);
                    _imageUrl = imageUrl.data;
                }
                const newsItem: INews = {
                    ...values,
                    image: _imageUrl,
                };
                const { data } = await instance.patch<APIResponse<INews>>('/info/news/' + news._id, newsItem);
                if (data.message) {
                    toast.success(data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                formData.append('image', values.image);

                const { data: imageUrl } = await imageUploadInstance.post(
                    '/upload/image',
                    formData
                );
                const news: INews = {
                    ...values,
                    image: imageUrl.data,
                };

                const { data } = await instance.post<APIResponse<INews>>(
                    '/info/news',
                    news
                );
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
                title: string().required('Title is required'),
                url: string().required('Url is required'),
                description: string().required('Description is required'),
                image: string().required('Image is required'),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            News Title
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="title"
                            name="title"
                            placeholder="Add News Title"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="title" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">
                            News Url
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="url"
                            name="url"
                            placeholder="Add News Url"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="url" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <CKEditor
                            value={initialValue.description}
                            fieldName="description"
                            setFieldValue={setFieldValue}
                        />
                        <div className="text-danger">
                            <ErrorMessage name="description" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Photo
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
                                className='mt-2'
                                src={news.image}
                                alt={news.title}
                                layout="fixed"
                                placeholder="blur"
                                width={80}
                                height={50}
                            />
                        )}
                        {errors.image && touched.image && (
                            <div className="text-danger">
                                Photo is a required field
                            </div>
                        )}
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

export default AddNews;
