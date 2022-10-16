import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { VscChevronRight, VscClose } from 'react-icons/vsc';
import Modal from 'react-modal';
import { ErrorResponse, isAxiosError } from 'server/helpers/error';
import { IApply } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import { object, string } from 'yup';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#__next');
interface IModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
}

const ApplyModal: FC<IModalProps> = ({ closeModal, modalIsOpen }) => {

    const initialValue: IApply = {
        name: '',
        email: '',
        phone: '',
        description: '',
        position: '',
        file: '',
    };

    const onSubmitHandler = async (
        values: IApply,
        formikHelpers: FormikHelpers<IApply>
    ) => {
        const file: any = values.file;
        // 10mb
        if (file.size > 10485760) {
            toast.error('Your Pdf size should be equal or less than 10MB');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('file', values.file);

            const { data: fileUrl } = await imageUploadInstance.post('/upload/file', formData);

            const _apply: IApply = {
                ...values,
                file: fileUrl.data,
            };

            const { data } = await instance.post<{ message: string; }>(`/apply`, _apply);
            if (data.message) {
                toast.success(data.message);
                formikHelpers.resetForm();
                closeModal();
            }

        }
        catch (err) {
            if (!isAxiosError<ErrorResponse>(err) || !err.response) {
                throw err;
            }
            toast.error(err.response.data.message);
        }
    };

    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Apply Modal"
    >

        <div className="close-btn" onClick={closeModal} >
            <VscClose />
        </div>
        <div className="apply-modal">
            <div className="popup-inner">
                <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmitHandler}
                    validationSchema={object({
                        name: string().required('Name is required'),
                        email: string().required('Email is required'),
                        phone: string().required('Phone is required'),
                        description: string().required('Description is required'),
                        // position: string().required('Position is required'),
                    })}
                >
                    {({ touched, errors, isSubmitting, setFieldValue }) => (

                        <Form className="user-form">
                            <div className="input-group">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                />
                                <div className="text-danger">
                                    <ErrorMessage name="name" />
                                </div>
                            </div>
                            <div className="input-group">
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                />
                                <div className="text-danger">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div className="input-group">
                                <Field
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                />
                                <div className="text-danger">
                                    <ErrorMessage name="phone" />
                                </div>
                            </div>
                            <div className="input-group">
                                <Field
                                    type="text"
                                    name="position"
                                    placeholder="Apply Position"
                                />
                            </div>
                            <div className="input-group">
                                <Field
                                    as="textarea"
                                    type="text"
                                    name="description"
                                    placeholder="Write Yourself!"
                                    style={{ height: '120px' }}
                                />
                                <div className="text-danger">
                                    <ErrorMessage name="description" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className='mb-2'>  <b>Attach Portfolio/CV (Max 10MB, pdf only)</b> </label>
                                <input
                                    type="file"
                                    name=""
                                    accept='application/pdf'
                                    onChange={(event: any) => {
                                        setFieldValue(
                                            'file',
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                />
                            </div>


                            <div className="text-end">
                                <button type='submit' className='send-btn'  >
                                    <VscChevronRight />
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </Modal>;
};

export default ApplyModal;
