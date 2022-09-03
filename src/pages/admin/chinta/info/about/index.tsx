import { GetServerSideProps } from 'next';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { IAbout } from 'server/interface';
import instance from 'src/api/httpService';
import AboutForm from 'src/components/Admin/AboutForm';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';



interface AboutProps {
    about: IAbout;
}

const About = ({ about }: AboutProps) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const bioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bioRef.current) {
            bioRef.current.innerHTML = about.bio;
        }
    }, [about.bio]);

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
                                <MyImage
                                    src={about.photoUrl}
                                    alt={about.alt}
                                    layout="responsive"
                                    placeholder="blur"
                                    width={400}
                                    height={500}
                                />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="d-flex align-items-center justify-content-center h-100 ">
                                <div className="" ref={bioRef} />
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
    const { data } = await instance.get<{ data: IAbout[]; }>('/info/about');
    const about = data.data[0];

    return {
        props: {
            about
        },
    };
};

export default About;
