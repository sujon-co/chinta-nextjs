import { ReactNode } from 'react';
import AdminLayout from 'src/components/Admin/AdminLayout';


interface JobsProps {

}

const Jobs = ({ }: JobsProps) => {

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Jobs</h5>

            </div>
            <div className="card-body">
                Under development...
            </div>
        </div>
    );
};

Jobs.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Jobs;
