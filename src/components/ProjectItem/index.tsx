/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import { NextPage } from 'next';
import Link from 'next/link';
import { IProject } from 'server/interface';
import MyImage from '../Image';

interface Props {
    project: IProject;
}

const ProjectItem: NextPage<Props> = ({ project }) => {
    return (
        <Link as={`/projects/${project._id}`} href="/projects/[slug]">
            <a className="project-item">
                <div className="project-item-img">
                    <MyImage
                        className="img-fluid"
                        src={project.topImage}
                        layout="responsive"
                        alt={project.name}
                        height={155}
                        width={200}
                        objectFit="cover"
                    />
                    <div className="project-item-overlay">
                        <h6> {project.name} </h6>
                        <div className="fs-sm">Location: Dhaka, Bangladesh</div>
                        <div className="fs-sm">
                            Data:{' '}
                            {moment(project.updatedAt).toDate().toLocaleDateString()} </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default ProjectItem;
