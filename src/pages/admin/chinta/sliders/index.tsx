import moment from 'moment';
import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { ISlider } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
import AddSlider from 'src/components/Admin/AddSlider';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';

type deleteSliderResponse = {
    message: string;
};
interface IProps {
    sliders: ISlider[];
}

const Sliders = ({ sliders }: IProps) => {
    const [isAddSlider, setIsAddSlider] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [sliderPlaceholder, setSliderPlaceholder] =
        useState<ISlider>({} as ISlider);

    const sliderDeleteHandler = async (slider: ISlider) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<deleteSliderResponse>('sliders/' + slider._id);
            await imageUploadInstance.delete('/upload/image', {
                data: {
                    path: slider.photoUrl
                }
            });


            if (data) {
                toast.success(data.message);
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    const updateHandler = (slider: ISlider) => {
        setIsAddSlider(true);
        setIsUpdate(true);
        setSliderPlaceholder(slider);
    };
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Sliders</h5>
                {!isAddSlider && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsAddSlider(true);
                            setIsUpdate(false);
                        }}
                    >
                        Add Slider
                    </div>
                )}
            </div>
            <div className="card-body">
                {isAddSlider && (
                    <AddSlider
                        isAddSlider={isAddSlider}
                        setIsAddSlider={setIsAddSlider}
                        isUpdate={isUpdate}
                        slider={sliderPlaceholder}
                    />
                )}
                {!isAddSlider && (
                    <div className="row">
                        {sliders.length > 0 ? (
                            sliders.map((slider) => (
                                <div className="col-md-6" key={slider.photoUrl}>
                                    <div className="card p-2 d-flex gap-2 flex-row mb-3">
                                        <MyImage
                                            layout="fixed"
                                            className="rounded-1 img-fluid"
                                            src={slider.photoUrl}
                                            alt={slider.alt}
                                            placeholder="blur"
                                            width={100}
                                            height={80}
                                        />
                                        <div className="card-body p-0">
                                            <p className="card-text mb-0">
                                                <b> Title: </b>
                                                <span>{slider.alt}</span>
                                            </p>
                                            <p className="card-text mb-2">
                                                <small className="text-muted">
                                                    Last updated{' '}
                                                    {moment(slider.updatedAt).fromNow()}
                                                </small>
                                            </p>
                                            <div className="d-flex gap-1 mb-0">
                                                <button
                                                    className="btn btn-success btn-sm fs-12"
                                                    onClick={() => updateHandler(slider)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm fs-12"
                                                    onClick={() => sliderDeleteHandler(slider)}
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
                                <h6>No Slider Found</h6>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Sliders.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: ISlider[]; }>('/sliders');
    return {
        props: {
            sliders: data.data
        }
    };
};

export default Sliders;
