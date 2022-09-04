/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FC } from 'react';
import { IProject } from 'server/interface';
import { config } from 'src/config';
interface IProjectListProps {
    projects: IProject[];
}

const ProjectList: FC<IProjectListProps> = ({ projects }) => {
    return <>
        {projects.map((project, index) => (
            <Link as={`/projects/${project._id}`} href="/projects/[slug]" key={index + 1}>
                <a className="status-project-item" >
                    <img
                        src={`${config.imageUploadUrl}${project.topImage}`}
                        className="status-project-item-img "
                        alt={project.name}
                        title={project.name}
                        height={50}
                        width={50}
                    />
                    <div className="status-project-item-title">
                        SKI
                    </div>
                </a>
            </Link>
        ))}
    </>;
};

export default ProjectList;
