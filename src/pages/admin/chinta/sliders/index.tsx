import axios from 'axios';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import { ISlider } from 'server/interface';
import AddSlider from 'src/components/AddSlider';
import AdminLayout from 'src/components/AdminLayout';
import { NextPageWithLayout } from 'src/pages/_app';

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

const Sliders: NextPageWithLayout = ({ sliders }: IProps) => {
    const [isAddSlider, setIsAddSlider] = useState(false);
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
                <pre></pre>
                {/* <div className="card p-2 d-flex gap-2 flex-row mb-3 ">
                    <Image
                        {...image}
                        width={100}
                        height={100}
                        layout="fixed"
                        className=" rounded-1 img-fluid"
                        alt="..."
                    />
                    <div className="card-body p-0">
                        <p className="card-text mb-0">
                            <b>Alt: </b>
                            <span>
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                            </span>
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
                </div> */}
                {isAddSlider && (
                    <AddSlider
                        isAddSlider={isAddSlider}
                        setIsAddSlider={setIsAddSlider}
                    />
                )}
            </div>
        </div>
    );
};

Sliders.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = async () => {
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
