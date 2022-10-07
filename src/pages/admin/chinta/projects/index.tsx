import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import { IProject } from 'server/interface';
import instance, { imageUploadInstance } from 'src/api/httpService';
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


    const deleteHandler = async (project: IProject) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<{ message: string; }>(
                `/projects/${project._id}`
            );
            await imageUploadInstance.delete('/upload/images', {
                data: {
                    galleryPath: project.gallery
                }
            });
            if (data.message) {
                toast.success(data.message);
                window.location.reload();
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
                                        <th>SN</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Top Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project, index) => (
                                        <tr key={Math.random()}>
                                            <td style={{ minWidth: '40px' }}> <span className='fw-bolder'>{index + 1}</span> </td>
                                            <td> <span className='fw-bolder'>{project.name}</span> </td>
                                            <td > {project.year} </td>
                                            <td className='text-capitalize'> {project.status} </td>
                                            <td className='text-capitalize'> {project.type} </td>
                                            <td>
                                                {project.gallery[project.topImage - 1] && (
                                                    <MyImage
                                                        className='img-fluid'
                                                        src={project.gallery[project.topImage - 1]}
                                                        alt={project.name}
                                                        layout="fixed"
                                                        placeholder="blur"
                                                        width={80}
                                                        height={50}
                                                        objectFit="cover"
                                                        preloader={false}
                                                    />
                                                )}
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
                                                        onClick={() => deleteHandler(project)}
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
        </div >
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
