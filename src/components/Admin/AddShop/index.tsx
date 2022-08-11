import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { IShop, ResponseError } from 'server/interface';
import instance from 'src/api/httpService';
import { array, object, string } from 'yup';

function slugify(str: string) {
    return str
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
};

interface IAddShop {
    shop: IShop;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddShop: FC<IAddShop> = ({ setIsAdd, isUpdate, shop }) => {
    const initialValue: IShop = {
        title: isUpdate ? shop.title : '',
        url: isUpdate ? shop.url : '',
        shortDescription: isUpdate ? shop.shortDescription : '',
        description: isUpdate ? shop.description : '',
        previousPrice: isUpdate ? shop.previousPrice : '',
        price: isUpdate ? shop.price : '',
        stock: isUpdate ? shop.stock : '',
        images: isUpdate ? shop.images : [],
    } as IShop;

    const onSubmitHandler = async (
        values: IShop,
        formikHelpers: FormikHelpers<IShop>
    ) => {
        try {
            console.log({ values });
            const formData = new FormData();
            values.images.forEach((image) => {
                formData.append('images', image);
            });

            const {
                data: { data: imageUrl },
            } = await axios.post(
                'http://localhost:4000/api/upload/images',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log({ imageUrl });
            const shop: IShop = {
                ...values,
                url: slugify(values.title),
                images: imageUrl.images,
            };
            const { data } = await instance.post<{ message: string; }>('/info/shops', shop);
            if (data.message) {
                toast.success(data.message);
                formikHelpers.resetForm();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

            // if (isUpdate) {
            //     const { data } = await instance.patch<{ message: string; }>('/info/awards/' + shop._id, values);

            //     if (data.message) {
            //         toast.success(data.message);
            //         formikHelpers.resetForm();
            //         setTimeout(() => {
            //             window.location.reload();
            //         }, 1000);
            //     }
            // } else {
            //     const { data } = await instance.post<{ message: string; }>('/info/awards', values);

            //     if (data.message) {
            //         toast.success(data.message);
            //         formikHelpers.resetForm();
            //         setTimeout(() => {
            //             window.location.reload();
            //         }, 1000);
            //     }
            // }
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
                shortDescription: string().required('Short description is required'),
                price: string().required('Price is required'),
                stock: string().required('Stock is required'),
                images: array().required('Images is required'),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue, values }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Product Title
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="title"
                            name="title"
                            placeholder="Product Title"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="title" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="previousPrice" className="form-label">
                            Product Previous Price (optional)
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="previousPrice"
                            name="previousPrice"
                            placeholder="Add Product Previous Price"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Product Price
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="price"
                            name="price"
                            placeholder="Add Product  Price"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="price" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">
                            Product Stock
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="stock"
                            name="stock"
                            placeholder="Add Product Stock"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="stock" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="shortDescription" className="form-label">
                            Short Description
                        </label>
                        <Field
                            as="textarea"
                            type="text"
                            className="form-control form-control-sm"
                            id="shortDescription"
                            name="shortDescription"
                            placeholder="Add Short Description"
                            style={{ height: '100px' }}
                        />
                        <div className="text-danger">
                            <ErrorMessage name="shortDescription" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description (optional)
                        </label>
                        <Field
                            as="textarea"
                            type="text"
                            className="form-control form-control-sm"
                            id="description"
                            name="description"
                            placeholder="Add Description"
                            style={{ height: '120px' }}
                        />
                        <div className="text-danger">
                            <ErrorMessage name="description" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                            Images
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="images"
                            name="images"
                            onChange={(event: any) => {
                                setFieldValue('images', [
                                    ...values.images,
                                    event.currentTarget.files[0],
                                ]);
                            }}
                        />
                        {errors.images && touched.images && (
                            <div className="text-danger">
                                Minimum one image required
                            </div>
                        )}
                    </div>
                    <div className='mb-3'>
                        {values.images.map((image: any, index: number) => (
                            <div key={index}> {image.name}</div>
                        ))}
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

export default AddShop;
