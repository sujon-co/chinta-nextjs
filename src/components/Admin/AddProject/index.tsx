import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { IProject } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import { config } from 'src/config';
import { number, object, string } from 'yup';

interface IAddProjectProps {
    project: IProject;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddProject: FC<IAddProjectProps> = ({ project, isUpdate, setIsAdd }) => {
    const initialValues: IProject = {
        _id: isUpdate ? project._id : '',
        name: isUpdate ? project.name : '',
        type: isUpdate ? project.type : 'residential',
        status: isUpdate ? project.status : 'idea',
        principalArchitect: isUpdate ? project.principalArchitect : '',
        designTeam: isUpdate ? project.designTeam : '',
        engineer: isUpdate ? project.engineer : '',
        taskConstructionFirm: isUpdate ? project.taskConstructionFirm : '',
        photograph: isUpdate ? project.photograph : '',
        year: isUpdate ? project.year : 2022,
        description: isUpdate ? project.description : '',
        topImage: isUpdate ? project.topImage : '',
        portraitImage: isUpdate ? project.portraitImage : '',
        landscape: isUpdate ? project.landscape : '',
        size: isUpdate ? project.size : '',
        images: isUpdate ? project.images : [],
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
            if (!isUpdate) {
                console.log({ values });
                const formData = new FormData();

                formData.append('topImage', values.topImage);
                formData.append('portraitImage', values.portraitImage);
                values.images.forEach((image) => {
                    formData.append('images', image);
                });

                const {
                    data: { data: imageUrl },
                } = await axios.post(
                    `${config.imageUploadUrl}/api/upload/images`,
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

                // @ts-ignore
                delete project._id;

                const { data } = await instance.post('/projects', project);
                if (data.success) {
                    toast.success(data.message);
                    // formikHelpers.resetForm();
                    setTimeout(() => {
                        // window.location.reload();
                    }, 1000);
                } else {
                    toast.error(data.message);
                }
            } else {
                const formData = new FormData();

                let _topImage = '';
                let _portraitImage = '';

                if (typeof values.topImage === 'string') {
                    _topImage = values.topImage;
                } else {
                    formData.append('topImage', values.topImage);
                    formData.append('topImagePath', project.topImage);
                }

                if (typeof values.portraitImage === 'string') {
                    _portraitImage = values.portraitImage;
                } else {
                    formData.append('portraitImage', values.portraitImage);
                    formData.append('portraitImagePath', project.portraitImage);
                }

                values.images.forEach((image) => {
                    if (typeof image !== 'string') {
                        formData.append('images', image);
                    } else {
                        console.log('String file');
                    }
                });

                const { data: imageUrl } = await imageUploadInstance.patch(
                    '/upload/images',
                    formData
                );

                _topImage = imageUrl.data.topImage
                    ? imageUrl.data.topImage
                    : project.topImage;
                _portraitImage = imageUrl.data.portraitImage
                    ? imageUrl.data.portraitImage
                    : project.portraitImage;

                const _project: IProject = {
                    ...values,
                    topImage: _topImage,
                    portraitImage: _portraitImage,
                    images: imageUrl.images,
                };

                // @ts-ignore
                delete _project._id;

                console.log({ _topImage, _portraitImage });
                console.log({ _project, imageUrl });

                const { data } = await instance.patch(
                    `/projects/${project._id}`,
                    _project
                );
                if (data.success) {
                    toast.success(data.message);
                    // formikHelpers.resetForm();
                    // setTimeout(() => { window.location.reload(); }, 1000);
                }
                console.log(data);
            }
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
                name: string().required('Name is required'),
                type: string().required('Type is required'),
                status: string().required('Status is required'),
                principalArchitect: string().required(
                    'Principal architect is required'
                ),
                designTeam: string().required('Design team is required'),
                engineer: string().required('Engineer is required'),
                taskConstructionFirm: string().required(
                    'Task construction firm is required'
                ),
                photograph: string().required('Photograph is required'),
                year: number().required('Year is required'),
                description: string().required('Description is required'),
                topImage: string().required('Top image is required'),
                portraitImage: string().required('Portrait image is required'),
                // images: array(any).required('Images is required'),
                // gallery: array().required('Gallery is required'),
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
                        <label htmlFor="landscape" className="form-label">
                            Landscape
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="landscape"
                            name="landscape"
                            placeholder="Add Landscape"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="landscape" />
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
                        <label htmlFor="size" className="form-label">
                            Size
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="size"
                            name="size"
                            placeholder="Add Size"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="size" />
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
                            <ErrorMessage name="year" />
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
                        {errors.portraitImage && touched.portraitImage && (
                            <div className="text-danger">
                                Portrait Image is a required field
                            </div>
                        )}
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
                                Images is a required field
                            </div>
                        )}
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="gallery" className="form-label">
                            Gallery
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="gallery"
                            name="gallery"
                            onChange={(event: any) => {
                                setFieldValue('gallery', [
                                    ...values.gallery,
                                    event.currentTarget.files[0],
                                ]);
                            }}
                        />
                    </div>
                    {errors.gallery && touched.gallery && (
                        <div className="text-danger">
                            Gallery  is a required field
                        </div>
                    )} */}
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

export default AddProject;
