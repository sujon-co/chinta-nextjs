import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { ISlider } from 'server/interface';
import AddSlider from 'src/components/AddSlider';
import AdminLayout from 'src/components/AdminLayout';

type deleteSliderResponse = {
    message: string;
};
interface IProps {
    sliders: {
        base64: string;
        alt: string;
        src: string;
        height: number;
        width: number;
        type?: string | undefined;
    }[];
}

const Sliders = ({ sliders }: IProps) => {
    const [isAddSlider, setIsAddSlider] = useState(false);
    const sliderDeleteHandler = async (id: string) => {
        const { data } = await axios.delete<deleteSliderResponse>('/sliders');
        if (data) {
            toast.success(data.message);
        }
    };
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Sliders</h5>
                {!isAddSlider && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => setIsAddSlider(true)}
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
                    />
                )}
                {!isAddSlider && (
                    <div className="row">
                        {sliders.map((slider) => (
                            <div className="col-md-6" key={slider.src}>
                                <div className="card p-2 d-flex gap-2 flex-row mb-3">
                                    <Image
                                        layout="fixed"
                                        className="rounded-1 img-fluid"
                                        src={slider.src}
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
                                            <button className="btn btn-success btn-sm fs-12">
                                                Update
                                            </button>
                                            <button className="btn btn-danger btn-sm fs-12">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
    const { data } = await axios.get<{ data: ISlider[] }>('/sliders');

    const sliders = await Promise.all(
        data.data.map(async (data) => {
            const { base64, img } = await getPlaiceholder(data.photoUrl);
            return {
                ...img,
                base64: base64,
                alt: data.alt,
            };
        })
    ).then((value) => value);

    return {
        props: { sliders },
    };
};

export default Sliders;
