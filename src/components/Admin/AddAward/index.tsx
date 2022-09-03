import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { IAward, ResponseError } from 'server/interface';
import instance from 'src/api/httpService';
import { number, object, string } from 'yup';

interface IAddAward {
    award: IAward;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    isUpdate: boolean;
}

const AddAward: FC<IAddAward> = ({ setIsAdd, isUpdate, award }) => {
    const initialValue: IAward = {
        awardName: isUpdate ? award.awardName : '',
        programName: isUpdate ? award.programName : '',
        programUrl: isUpdate ? award.programUrl : '',
        year: isUpdate ? award.year : '',
        organizedBy: isUpdate ? award.organizedBy : '',
        organizationUrl: isUpdate ? award.organizationUrl : '',
    } as IAward;

    const onSubmitHandler = async (
        values: IAward,
        formikHelpers: FormikHelpers<IAward>
    ) => {
        try {

            if (isUpdate) {
                const { data } = await instance.patch<{ message: string; }>('/info/awards/' + award._id, values);

                if (data.message) {
                    toast.success(data.message);
                    formikHelpers.resetForm();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                const { data } = await instance.post<{ message: string; }>('/info/awards', values);

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
                awardName: string().required('Award name is required'),
                programName: string().required('Program name is required'),
                year: number().required('Year is required'),
                organizedBy: string().required('Organized by is required'),
            })}
        >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="awardName" className="form-label">
                            Award Status
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="awardName"
                            name="awardName"
                            placeholder="Add Award Status"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="awardName" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="year" className="form-label">
                            Award Year
                        </label>
                        <Field
                            type="number"
                            className="form-control form-control-sm"
                            id="year"
                            name="year"
                            placeholder="Award Year"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="year" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="programName" className="form-label">
                            Program Name
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="programName"
                            name="programName"
                            placeholder="Program Name"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="programName" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="programUrl" className="form-label">
                            Program Url (Optional)
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="programUrl"
                            name="programUrl"
                            placeholder="Program Url"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="organizedBy" className="form-label">
                            Organized By
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="organizedBy"
                            name="organizedBy"
                            placeholder="Organized By"
                        />
                        <div className="text-danger">
                            <ErrorMessage name="organizedBy" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="organizationUrl" className="form-label">
                            Organization Url (Optional)
                        </label>
                        <Field
                            type="text"
                            className="form-control form-control-sm"
                            id="organizationUrl"
                            name="organizationUrl"
                            placeholder="Organization Url"
                        />
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

export default AddAward;
