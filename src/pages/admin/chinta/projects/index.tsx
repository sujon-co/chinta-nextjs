/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import AddProject from 'src/components/Admin/AddProject';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';

interface IProps {
    projects: IProject[];
}

const Projects = ({ projects }: IProps) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [project, setProject] = useState<IProject>({} as IProject);

    const deleteHandler = async (id: any) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<{ message: string; }>(
                `/projects/${id}`
            );
            if (data.message) {
                toast.success(data.message);
                // window.location.reload();
            }
        }
    };
    const updateHandler = (project: IProject) => {
        setIsAdd(true);
        setIsUpdate(true);
        setProject(project);
    };
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Projects</h5>
                {!isAdd && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsAdd(true);
                            setIsUpdate(false);
                        }}
                    >
                        Add Project
                    </div>
                )}
            </div>
            <div className="card-body">
                {isAdd && (
                    <AddProject
                        isUpdate={isUpdate}
                        project={project}
                        setIsAdd={setIsAdd}
                    />
                )}
                {!isAdd && (
                    <div className="pe-3" style={{ height: '70vh', overflowY: 'auto' }}>
                        <div className="table-responsive modified-table">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Principal Architect</th>
                                        <th scope="col">Engineer</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Top Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.topImage}>
                                            <td> <span className='fw-bolder'>{project.name}</span> </td>
                                            <td> {project.principalArchitect}{' '} </td>
                                            <td>{project.engineer} </td>
                                            <td>{project.year} </td>
                                            <td>
                                                <MyImage
                                                    className='img-fluid'
                                                    src={project.topImage}
                                                    alt={project.name}
                                                    layout="fixed"
                                                    placeholder="blur"
                                                    width={80}
                                                    height={50}
                                                    objectFit="cover"
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1 mb-0">
                                                    <button
                                                        className="btn btn-success btn-sm fs-12"
                                                        onClick={() => updateHandler(project)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm fs-12"
                                                        onClick={() => deleteHandler(project._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

Projects.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: IProject[]; }>('/projects');
    return {
        props: {
            projects: data.data,
        },
    };
};

export default Projects;
