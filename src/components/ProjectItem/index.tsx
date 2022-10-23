/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FC } from 'react';
import { IProject } from 'server/interface';
import MyImage from '../Image';

interface Props {
    project: IProject;
}

const ProjectItem: FC<Props> = ({ project }) => {

    return (
        <Link as={`/projects/${project.slug}`} href="/projects/[slug]">
            <a className="project-item">
                <div className="project-item-img">
                    <MyImage
                        className="img-fluid"
                        src={project.gallery[project.topImage - 1]}
                        layout="responsive"
                        alt={project.name}
                        height={155}
                        width={200}
                        objectFit="cover"
                        preloaderSize="small"
                    />
                    <div className="project-item-overlay">
                        <h6> {project.name} </h6>
                        <div className="fs-sm d-flex justify-content-between align-items-end">
                            <span>{project?.location}</span>
                            <span>{project?.year}</span>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default ProjectItem;
