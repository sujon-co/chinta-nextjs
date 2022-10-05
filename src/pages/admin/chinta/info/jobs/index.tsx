import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import { IJob } from 'server/interface';
import instance from 'src/api/httpService';
import AddJob from 'src/components/Admin/AddJob';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';


interface JobsProps {
    job: IJob;
}

const Jobs = ({ job }: JobsProps) => {
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Job Details</h5>
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
                    <AddJob
                        isUpdate={isUpdate}
                        job={job}
                        setIsUpdate={setIsUpdate}
                    />
                )}
                {!isUpdate && (
                    <div className="row">
                        <div className="col-md-12 mx-auto">
                            <div className="about-img">
                                regulation: 1975 × 900 px
                                <MyImage
                                    src={job.image}
                                    alt={job.title}
                                    layout="responsive"
                                    placeholder="blur"
                                    width={1975}
                                    height={900}
                                />
                            </div>
                        </div>
                        <h4 className='text-success py-3'>{job.title}</h4>
                        <div className=" h-100 mb-3">
                            <div className="" dangerouslySetInnerHTML={{ __html: job.description }} />
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

Jobs.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};
export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: IJob[]; }>('/info/jobs');
    const job = data?.data[0];

    return {
        props: {
            job,
        },
    };
};

export default Jobs;
