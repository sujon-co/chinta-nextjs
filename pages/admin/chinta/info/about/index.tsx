import axios from 'axios';
import AboutForm from 'components/Admin/AboutForm';
import AdminLayout from 'components/Admin/AdminLayout';
import { Types } from 'mongoose';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { ReactNode, useState } from 'react';
import { IAbout } from 'server/interface';

export interface IAboutWithImagePlaceholder {
    base64: string;
    _id: Types.ObjectId;
    photoUrl: string;
    bio: string;
    alt: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
}

interface AboutProps {
    about: IAboutWithImagePlaceholder;
}

const About = ({ about }: AboutProps) => {
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">About</h5>
                {!isUpdate && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsUpdate(true);
                        }}
                    >
                        Update
                    </div>
                )}
            </div>
            <div className="card-body">
                {isUpdate && (
                    <AboutForm
                        isUpdate={isUpdate}
                        about={about}
                        setIsUpdate={setIsUpdate}
                    />
                )}
                {!isUpdate && (
                    <div className="row">
                        <div className="col-md-5 col-lg-4">
                            <div className="about-img">
                                <Image
                                    src={about.src}
                                    alt={about.alt}
                                    layout="responsive"
                                    placeholder="blur"
                                    blurDataURL={about.base64}
                                    height={about.height}
                                    width={about.width}
                                />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="d-flex align-items-center justify-content-center h-100 ">
                                <div className="">{about.bio}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

About.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await axios.get<{ data: IAbout[] }>('/info/about');
    const about = data.data[0];

    const { base64, img } = await getPlaiceholder(about.photoUrl);
    return {
        props: {
            about: {
                ...img,
                ...about,
                base64: base64,
            },
        },
    };
};

export default About;
