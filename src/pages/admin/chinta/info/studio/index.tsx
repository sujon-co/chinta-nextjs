import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { RiLinksFill } from 'react-icons/ri';
import { IStudio } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import AddStudio from 'src/components/Admin/AddStudio';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';

interface IProps {
    studios: IStudio[];
}

const Studio = ({ studios }: IProps) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [studio, setStudio] = useState<IStudio>({} as IStudio);

    const deleteHandler = async (studio: IStudio) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<{ message: string; }>('/info/studios/' + studio._id);
            await imageUploadInstance.delete('/upload/image', {
                data: {
                    path: studio.photoUrl
                }
            });

            if (data) {
                toast.success(data.message);
            }
            window.location.reload();
        }
    };
    const updateHandler = (studio: IStudio) => {
        setIsAdd(true);
        setIsUpdate(true);
        setStudio(studio);
    };
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Studio</h5>
                {!isAdd && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsAdd(true);
                            setIsUpdate(false);
                        }}
                    >
                        Add Studio
                    </div>
                )}
            </div>
            <div className="card-body">
                {isAdd && (
                    <AddStudio
                        isAdd={isAdd}
                        setIsAdd={setIsAdd}
                        isUpdate={isUpdate}
                        studio={studio}
                    />
                )}
                {!isAdd && (
                    <div className="row">
                        {studios.length > 0 ? (
                            studios.map((studio) => (
                                <div className="col-md-3" key={studio.name}>
                                    <div className="card p-2  mb-3">
                                        <div className="w-100">
                                            <MyImage
                                                layout="responsive"
                                                className="rounded-1 img-fluid"
                                                src={studio.photoUrl}
                                                alt={studio.alt}
                                                placeholder="blur"
                                                width={244}
                                                height={317}
                                                objectFit="cover"
                                                preloader={false}
                                            />
                                        </div>
                                        <div className="card-body p-0">
                                            <p className="card-text mb-0">
                                                <b>{studio.name}</b>
                                            </p>
                                            <p className="card-text mb-0">
                                                {studio.designation}
                                            </p>
                                            <div className="card-text pb-2">
                                                <div className="social-icons">
                                                    {studio.socialLink.instagram && (
                                                        <a
                                                            href={studio.socialLink?.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="social-icons-item"
                                                        >
                                                            <FaInstagram />
                                                        </a>
                                                    )}
                                                    {studio.socialLink.linkedIn && (
                                                        <a
                                                            href={studio.socialLink?.linkedIn}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="social-icons-item"
                                                        >
                                                            <FaLinkedinIn />
                                                        </a>
                                                    )}
                                                    {studio.socialLink.website && (
                                                        <a
                                                            href={studio.socialLink?.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="social-icons-item"
                                                        >
                                                            <RiLinksFill />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="d-flex gap-1 mb-0">
                                                <button
                                                    className="btn btn-success btn-sm fs-12"
                                                    onClick={() =>
                                                        updateHandler(studio)
                                                    }
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm fs-12"
                                                    onClick={() => deleteHandler(studio)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-md-12">
                                <h6>No Studio Found, Please Add Someone :) </h6>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Studio.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: { data }, } = await instance.get<{ data: IStudio[]; }>('/info/studios');
    return {
        props: {
            studios: data,
        },
    };
};

export default Studio;
