/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import AddProject from 'src/components/Admin/AddProject';
import AdminLayout from 'src/components/Admin/AdminLayout';
import { config } from 'src/config/index';

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
            const { data } = await instance.delete<{ message: string }>(
                `/projects/${id}`
            );
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
                    <div className="">
                        <div className="table-responsive modified-table">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Principal Architect</th>
                                        <th scope="col">Design Team</th>
                                        <th scope="col">Landscape</th>
                                        <th scope="col">Engineer</th>
                                        <th scope="col">
                                            Task Construction Firm
                                        </th>
                                        <th scope="col">Photograph</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Top Image</th>
                                        <th scope="col">Portrait Image</th>
                                        <th scope="col">Images</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.topImage}>
                                            <td>{project.name}</td>
                                            <td>{project.type} </td>
                                            <td>
                                                {project.principalArchitect}{' '}
                                            </td>
                                            <td>{project.designTeam} </td>
                                            <td>{project.landscape} </td>
                                            <td>{project.engineer} </td>
                                            <td>
                                                {project.taskConstructionFirm}{' '}
                                            </td>
                                            <td>{project.photograph} </td>
                                            <td>{project.size} </td>
                                            <td>{project.year} </td>
                                            <td>
                                                <img
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                    className="img-fluid"
                                                    src={`${config.imageUploadUrl}${project.topImage}`}
                                                    alt={project.topImage}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                    className="img-fluid"
                                                    src={`${config.imageUploadUrl}${project.portraitImage}`}
                                                    alt={project.portraitImage}
                                                />
                                            </td>
                                            <td>
                                                <div
                                                    className="d-flex gap-1 flex-wrap"
                                                    style={{ width: 215 }}
                                                >
                                                    {project.images.map(
                                                        (image) => (
                                                            <img
                                                                key={image}
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                }}
                                                                className="img-fluid"
                                                                src={`${config.imageUploadUrl}${image}`}
                                                                alt={image}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1 mb-0">
                                                    <button
                                                        className="btn btn-success btn-sm fs-12"
                                                        onClick={() =>
                                                            updateHandler(
                                                                project
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm fs-12"
                                                        onClick={() =>
                                                            deleteHandler(
                                                                project._id
                                                            )
                                                        }
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
    const { data } = await instance.get<{ data: IProject[] }>('/projects');
    return {
        props: {
            projects: data.data,
        },
    };
};

export default Projects;
