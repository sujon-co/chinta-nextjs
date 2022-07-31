import { Types } from 'mongoose';
import { GetServerSideProps } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import AddSlider from 'src/components/Admin/AddSlider';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';
import { config } from 'src/config';

type deleteSliderResponse = {
    message: string;
};
export interface ISliderPlaceholder {
    base64: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
    _id: Types.ObjectId;
    photoUrl: string;
    alt: string;
}
interface IProps {
    sliders: ISliderPlaceholder[];
}

const Sliders = ({ sliders }: IProps) => {
    const [isAddSlider, setIsAddSlider] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [sliderPlaceholder, setSliderPlaceholder] =
        useState<ISliderPlaceholder>({} as ISliderPlaceholder);

    const sliderDeleteHandler = async (id: Types.ObjectId) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<deleteSliderResponse>(
                'sliders/' + id
            );
            if (data) {
                toast.success(data.message);
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    const updateHandler = (slider: ISliderPlaceholder) => {
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
                                <div className="col-md-6" key={slider.src}>
                                    <div className="card p-2 d-flex gap-2 flex-row mb-3">
                                        <MyImage
                                            layout="fixed"
                                            className="rounded-1 img-fluid"
                                            src={slider.photoUrl}
                                            alt={slider.alt}
                                            placeholder="blur"
                                            blurDataURL={slider.base64}
                                            height={100}
                                            width={100}
                                        />
                                        <div className="card-body p-0">
                                            <p className="card-text mb-0">
                                                <b>Alt: </b>
                                                <span>{slider.alt}</span>
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    Last updated 3 mins ago
                                                </small>
                                            </p>
                                            <div className="d-flex gap-1 mb-0">
                                                <button
                                                    className="btn btn-success btn-sm fs-12"
                                                    onClick={() =>
                                                        updateHandler(slider)
                                                    }
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm fs-12"
                                                    onClick={() =>
                                                        sliderDeleteHandler(
                                                            slider._id
                                                        )
                                                    }
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

    if (data.data.length > 0) {
        const sliders = await Promise.all(
            data.data.map(async (data) => {
                const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${data.photoUrl}`);
                return {
                    ...data,
                    ...img,
                    base64: base64,
                };
            })
        );

        return {
            props: { sliders },
        };
    } else {
        return {
            props: { sliders: [] },
        };
    }
};

export default Sliders;
