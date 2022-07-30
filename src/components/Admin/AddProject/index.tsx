import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import { object } from 'yup';

// interface IAddSliderProps {
//     studio: IStudioWithImagePlaceholder;
//     isAdd: boolean;
//     setIsAdd: Dispatch<SetStateAction<boolean>>;
//     isUpdate: boolean;
// }

const AddProject: FC = ({}) => {
    const initialValues: IProject = {
        name: '',
        type: 'residential',
        status: 'idea',
        principalArchitect: '',
        designTeam: '',
        engineer: '',
        taskConstructionFirm: '',
        photograph: '',
        year: 2022,
        description: '',
        topImage: '',
        portraitImage: '',
        images: [],
        map: {
            getLocation: {
                lat: 0,
                lng: 0,
            },
            locationName: '',
            zoomLevel: 12,
            streetButton: '',
            showMaker: true,
        },
    };

    const onSubmitHandler = async (
        values: IProject,
        formikHelpers: FormikHelpers<IProject>
    ) => {
        try {
            const formData = new FormData();

            formData.append('topImage', values.topImage);
            formData.append('portraitImage', values.portraitImage);
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

            const project: IProject = {
                ...values,
                topImage: imageUrl.topImage,
                portraitImage: imageUrl.portraitImage,
                images: imageUrl.images,
            };

            const { data } = await instance.post('/projects', project);
            console.log({ data, imageUrl });
            // if (data.success) {
            //     toast.success(data.message);
            //     // formikHelpers.resetForm();
            // } else {
            //     toast.error(data.message);
            // }
        } catch (err) {
            // const error = err as ResponseError;
            // toast.error(error.response?.data?.message);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
            validationSchema={object({
                // name: string().required(),
                // type: string().required(),
                // status: string().required(),
                // principalArchitect: string().required(),
                // designTeam: string().required(),
                // engineer: string().required(),
                // taskConstructionFirm: string().required(),
                // photograph: string().required(),
                // year: number().required(),
                // description: string().required(),
                // topImage: string().required(),
                // portraitImage: string().required(),
                // images: array(string()).optional(),
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
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="publicSpace">Public Space</option>
                            <option value="urbanism">Urbanism</option>
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
                            <option value="idea">Idea</option>
                            <option value="inProgress">In Progress</option>
                            <option value="underConstruction">
                                Under Construction
                            </option>
                            <option value="completed">Completed</option>
                        </Field>
                        <div className="text-danger">
                            <ErrorMessage name="status" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="principalArchitect"
                            className="form-label"
                        >
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
                        <label
                            htmlFor="taskConstructionFirm"
                            className="form-label"
                        >
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
                            placeholder="Photograph"
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

                        {errors.topImage && touched.topImage && (
                            <div className="text-danger">
                                Top Image is a required field
                            </div>
                        )}
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
                    {errors.portraitImage && touched.portraitImage && (
                        <div className="text-danger">
                            Portrait Image is a required field
                        </div>
                    )}
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
