import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import { IProject } from 'server/interface';
import { object } from 'yup';

// interface IAddSliderProps {
//     studio: IStudioWithImagePlaceholder;
//     isAdd: boolean;
//     setIsAdd: Dispatch<SetStateAction<boolean>>;
//     isUpdate: boolean;
// }

const AddProject: FC = ({ }) => {

    const onSubmitHandler = async (
        values: IProject,
        formikHelpers: FormikHelpers<IProject>
    ) => {
        try {
            // const formData = new FormData();
            // formData.append('name', values.name);
            // formData.append('designation', values.designation);
            // formData.append('file', values.photoUrl);
            // formData.append('alt', values.alt);
            // formData.append('socialLink.instagram', values.socialLink.instagram);
            // formData.append('socialLink.linkedIn', values.socialLink.linkedIn);


            // if (isUpdate) {
            //     const { data } = await axios.patch<{ message: string }>('/info/studios/' + studio._id,
            //         formData,
            //         { headers: { 'Content-Type': 'multipart/form-data' }, }
            //     );
            //     toast.success(data.message);
            // } else {
            //     const { data } = await axios.post<{ message: string }>('/info/studios',
            //         formData,
            //         { headers: { 'Content-Type': 'multipart/form-data' }, }
            //     );
            //     toast.success(data.message);
            // }

            // formikHelpers.resetForm();
            // window.location.reload();
        } catch (err) {
            // const error = err as ResponseError;
            // toast.error(error.response?.data?.message);
        }
    };
    return (
        <Formik
            initialValues={{} as IProject}
            onSubmit={onSubmitHandler}
            validationSchema={object({
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue, values }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Project Name
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="name"
                            name="name"
                            placeholder="Project Name"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="name" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">
                            Type
                        </label>
                        <Field
                            as="select"
                            className="form-control form-control-sm"
                            id="type"
                            name="type"
                            placeholder="Project Type"
                        >
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>
                        <div className="text-danger">
                            <ErrorMessage name="type" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <Field
                            as="select"
                            className="form-control form-control-sm"
                            id="status"
                            name="status"
                            placeholder="Project Status"
                        >
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>
                        <div className="text-danger">
                            <ErrorMessage name="status" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="principalArchitect" className="form-label">
                            Principal Architect
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="principalArchitect"
                            name="principalArchitect"
                            placeholder="Principal Architect"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="principalArchitect" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="designTeam" className="form-label">
                            Design Team
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="designTeam"
                            name="designTeam"
                            placeholder="Design Team"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="designTeam" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="engineer" className="form-label">
                            Engineer
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="engineer"
                            name="engineer"
                            placeholder="Engineer"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="engineer" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskConstructionFirm" className="form-label">
                            Task Construction Firm
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="taskConstructionFirm"
                            name="taskConstructionFirm"
                            placeholder="Task Construction Firm"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="taskConstructionFirm" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photograph" className="form-label">
                            Photograph
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="photograph"
                            name="photograph"
                            placeholder="Task Construction Firm"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="photograph" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="year" className="form-label">
                            Year
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="year"
                            name="year"
                            placeholder="year"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="photograph" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <Field
                            as="textarea"
                            className="form-control form-control-sm h-150"
                            id="description"
                            name="description"
                            placeholder="description"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="description" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="topImage" className="form-label">
                            Top Image
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="topImage"
                            name="topImage"
                            onChange={(event: any) => {
                                setFieldValue(
                                    'topImage',
                                    event.currentTarget.files[0]
                                );
                            }}
                        />

                        {/* {errors.photoUrl && touched.photoUrl && (
                            <div className="text-danger">
                                Photo is a required field
                            </div>
                        )} */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="portraitImage" className="form-label">
                            Portrait Image
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="portraitImage"
                            name="portraitImage"
                            onChange={(event: any) => {
                                setFieldValue(
                                    'portraitImage',
                                    event.currentTarget.files[0]
                                );
                            }}
                        />
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
                                setFieldValue(
                                    'images',
                                    event.currentTarget.files[0]
                                );
                            }}
                        />
                    </div>
                    <div className="d-flex gap-1 mb-0">
                        <button
                            type="button"
                            className="btn btn-dark btn-sm fs-12"
                        // onClick={() => setIsAdd(false)}
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

export default AddProject;
