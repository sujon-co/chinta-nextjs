import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { FaRegTimesCircle } from 'react-icons/fa';
import { IProject, ResponseError } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import CKEditor from 'src/components/CkEditor/CkEditor';
import MyImage from 'src/components/Image';
import { config } from 'src/config';
import { array, number, object, string } from 'yup';

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
        location: isUpdate ? project.location : '',
        taskConstructionFirm: isUpdate ? project.taskConstructionFirm : '',
        photograph: isUpdate ? project.photograph : '',
        year: isUpdate ? project.year : 2022,
        description: isUpdate ? project.description : '',
        video: isUpdate ? project.video : '',
        topImage: isUpdate ? project.topImage : 1,
        portraitImage: isUpdate ? project.portraitImage : 2,
        landscape: isUpdate ? project.landscape : '',
        size: isUpdate ? project.size : '',
        images: isUpdate ? project.images : '',
        gallery: isUpdate ? project.gallery : [],
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

        // max 50mb
        const totalSize: any = values.gallery.reduce((acc: any, file: any) => acc + file.size, 0);

        if (totalSize > 52428800) {
            toast.error('Your Total Images size should be less than 50MB');
            return;
        }

        const files: any = values.gallery;
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > 5242880) {
                toast.error('Your Image size should be equal or less than 5MB');
                return;
            }
        }

        try {
            if (!isUpdate) {
                const formData = new FormData();
                formData.append('name', values.name);
                values.gallery.forEach((image) => {
                    formData.append('gallery', image);
                });
                // max 70 images
                if (files.length > 70) {
                    toast.error('You can upload maximum 3 images');
                    return;
                }

                const { data: imageUrl } = await axios.post(`${config.imageUploadUrl}/api/upload/images`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );


                if (imageUrl.success) {
                    toast.success('Image Uploaded Successfully');

                    const project: IProject = {
                        ...values,
                        gallery: imageUrl.data?.gallery,
                    };

                    // @ts-ignore
                    delete project._id;
                    const { data } = await instance.post('/projects', project);

                    if (data.success) {
                        setTimeout(() => {
                            window.location.reload();
                            toast.success(data.message);
                            formikHelpers.resetForm();
                        }, 1000);
                    } else {
                        toast.error(data.message);
                    }
                } else {
                    toast.error('Submit Again, Image Upload Failed! ');
                }




            } else {
                const formData = new FormData();
                formData.append('name', values.name);

                values.gallery.forEach((image) => {
                    if (typeof image !== 'string') {
                        formData.append('gallery', image);
                    }
                });
                const isAddNewImage = values.gallery?.filter((img) => typeof img !== 'string').length;
                if (isAddNewImage) {
                    if (isAddNewImage > 70) {
                        toast.error('You can upload maximum 70 images');
                        return;
                    }
                }
                if (isAddNewImage) {
                    project.gallery.forEach((image) => {
                        formData.append('galleryPath', image);
                    });
                }

                const { data: imageUrl } = await imageUploadInstance.patch(
                    '/upload/images',
                    formData
                );


                if (imageUrl.success) {
                    toast.success(imageUrl.message);

                    const _project: IProject = {
                        ...values,
                        gallery: imageUrl.data?.gallery.length > 0 ? imageUrl.data?.gallery : project.gallery,
                    };

                    // @ts-ignore
                    delete _project._id;

                    const { data } = await instance.patch(`/projects/${project.slug}`, _project);
                    if (data.success) {
                        setTimeout(() => {
                            toast.success(data.message);
                            formikHelpers.resetForm();
                            window.location.reload();
                        }, 1000);
                    }
                } else {
                    toast.error('Submit Again, Image Upload Failed! ');
                }
            }
        } catch (err) {
            const error = err as ResponseError;
            toast.error(error.response?.data?.message);
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
                year: number().required('Year is required'),
                description: string().required('Description is required'),
                topImage: string().required('Top image number is required'),
                portraitImage: string().required(
                    'Portrait image number is required'
                ),
                gallery: array().min(1).required('Images is required'),
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
                            <option value="public space">Public Space</option>
                            <option value="urbanism">Urbanism</option>
                            <option value="interior">Interior</option>
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
                            <option value="in progress">In Progress</option>
                            <option value="under construction">
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
                            placeholder="Design Team (Optional)"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="landscape" className="form-label">
                            Landscape Architect
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="landscape"
                            name="landscape"
                            placeholder="Add Landscape (Optional)"
                        />
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
                            placeholder="Engineer (Optional)"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                            Location
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="location"
                            name="location"
                            placeholder="Add Location"
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="taskConstructionFirm"
                            className="form-label"
                        >
                            Task Construction Firm / Company Name
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="taskConstructionFirm"
                            name="taskConstructionFirm"
                            placeholder="Task Construction Firm / Company Name (Optional)"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photograph" className="form-label">
                            Photographer
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="photograph"
                            name="photograph"
                            placeholder="Photographer (Optional)"
                        />
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
                            placeholder="Add Size (Optional)"
                        />
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
                        <CKEditor
                            value={initialValues.description}
                            fieldName="description"
                            setFieldValue={setFieldValue}
                        />
                        <div className="text-danger">
                            <ErrorMessage name="description" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="video" className="form-label">
                            Video
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="video"
                            name="video"
                            placeholder="Add Video full link (Optional) "
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="topImage" className="form-label">
                            Top Image Number(Ratio=27:13)
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="topImage"
                            name="topImage"
                            placeholder="eg. 2 (valid number of image)"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="topImage" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="portraitImage" className="form-label">
                            Portrait Image Number(Ratio=320:377)
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="portraitImage"
                            name="portraitImage"
                            placeholder="eg. 5 (valid number of image)"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="portraitImage" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                            Images Numbers (separate by comma)
                        </label>
                        <Field
                            type="string"
                            className="form-control form-control-sm"
                            id="images"
                            name="images"
                            placeholder="Image Number (eg. 5, 7, 9 - valid number of image )"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="images" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gallery" className="form-label">
                            Gallery (Max 5MB)
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-sm"
                            id="gallery"
                            name="gallery"
                            multiple
                            accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg"
                            onChange={(event: any) => {
                                const sortedFiles = Array.from(event.target.files).sort((a: any, b: any) => a.name.localeCompare(b.name));
                                const filteredFiles = sortedFiles.filter(
                                    (file: any) => {
                                        return file.type.includes('image');
                                    }
                                );
                                setFieldValue('gallery', filteredFiles);
                            }}
                        />
                        {errors.gallery && touched.gallery && (
                            <div className="text-danger">
                                Gallery is a required field
                            </div>
                        )}
                        <div className="mb-2 mt-1">
                            {values.gallery
                                ?.filter((img) => typeof img !== 'string')
                                .map((image: any, index: number) => (
                                    <>
                                        {image?.name && (
                                            <div
                                                className="file-name"
                                                key={index + Math.random()}
                                            >
                                                <span>
                                                    <b>{index + 1}</b>: &nbsp;{' '}
                                                </span>
                                                <span> {image?.name} {image.size && (<small style={{ fontSize: '10px', marginLeft: '5px' }}> ({(image?.size / 1024 / 1024).toFixed(2)} MB) </small>)} </span>
                                                {image?.name && (
                                                    <span
                                                        className="remove"
                                                        onClick={() => {
                                                            const newImages = values.gallery?.filter((img: any) => img.name !== image.name);
                                                            setFieldValue('gallery', newImages);
                                                        }}
                                                    >
                                                        <FaRegTimesCircle />
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ))}
                        </div>
                        {isUpdate && (
                            <div className="d-flex flex-wrap gap-2">
                                {project.gallery?.map(
                                    (image: any, index: number) => (
                                        <div className="" key={index + Math.random()} >
                                            <div className="ms-2">
                                                {index + 1}
                                            </div>
                                            <MyImage
                                                src={image}
                                                alt={project.name}
                                                layout="fixed"
                                                placeholder="blur"
                                                width={80}
                                                height={50}
                                                objectFit="cover"
                                                preloader={false}
                                            />
                                        </div>
                                    )
                                )}
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
                            {isSubmitting ? (
                                <div className="d-flex gap-1">
                                    <div
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                    <span>Uploading please wait ...</span>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddProject;
