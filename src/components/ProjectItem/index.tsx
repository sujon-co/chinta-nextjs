/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import { Types } from 'mongoose';
import { NextPage } from 'next';
import Link from 'next/link';
import { config } from 'src/config';
import MyImage from '../Image';

export interface IProjectItem {
    _id: Types.ObjectId | string;
    name: string;
    type: 'residential' | 'commercial' | 'publicSpace' | 'urbanism';
    status: 'idea' | 'inProgress' | 'underConstruction' | 'completed';
    principalArchitect: string;
    designTeam: string;
    engineer: string;
    taskConstructionFirm: string;
    photograph: string;
    year: number;
    description: string;
    portraitImage: string;
    images: string[];
    map: {
        getLocation: {
            lat: string | number;
            lng: string | number;
        };
        locationName: string;
        zoomLevel: number;
        streetButton: string;
        showMaker: boolean;
    };
    updatedAt?: any;
    topImage: {
        base64: string;
        photoUrl: string;
        src: string;
        height: number;
        width: number;
        type?: string | undefined;
    };
}
interface Props {
    project: IProjectItem;
    isNextImage?: boolean;
}

const ProjectItem: NextPage<Props> = ({ project, isNextImage = true }) => {
    return (
        <Link as={`/projects/${project._id}`} href="/projects/[slug]">
            <a className="project-item">
                <div className="project-item-img">
                    {!isNextImage && (
                        <img
                            className="img-fluid"
                            src={`${config.imageUploadUrl}/${project.topImage}`}
                            alt={project.name}
                        />
                    )}
                    {isNextImage && (
                        <MyImage
                            className="img-fluid"
                            src={project.topImage.photoUrl}
                            layout="responsive"
                            alt={project.name}
                            height={project.topImage.height}
                            width={project.topImage.width}
                            blurDataURL={project.topImage.base64}
                        />
                    )}
                    <div className="project-item-overlay">
                        <h6> {project.name} </h6>
                        <div className="fs-sm">Location: Dhaka, Bangladesh</div>
                        <div className="fs-sm">
                            Data:{' '}
                            {moment(project.updatedAt)
                                .toDate()
                                .toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default ProjectItem;
