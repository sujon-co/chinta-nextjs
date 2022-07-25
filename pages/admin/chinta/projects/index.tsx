import AddProject from 'components/Admin/AddProject';
import AdminLayout from 'components/Admin/AdminLayout';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

interface IProps {}

const Projects = ({}: IProps) => {
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Projects</h5>
                <div className="btn btn-dark btn-sm">Add Project</div>
            </div>
            <div className="card-body">
                <AddProject />
            </div>
        </div>
    );
};

Projects.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            hello: 'message',
        },
    };
};

export default Projects;
