import { Types } from 'mongoose';
import { NextPage } from 'next';
import Link from 'next/link';
import MyImage from '../Image';

interface IProjectItem {
    _id: Types.ObjectId;
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
}

const ProjectItem: NextPage<Props> = ({ project }) => {
    return (
        <Link as={`/projects/${project._id}`} href="/projects/[slug]">
            <a className="project-item">
                <div className="project-item-img">
                    <MyImage
                        className="img-fluid"
                        src={project.topImage.photoUrl}
                        layout="responsive"
                        alt={project.name}
                        height={project.topImage.height}
                        width={project.topImage.width}
                        blurDataURL={project.topImage.base64}
                    />
                    <div className="project-item-overlay">
                        <h6> {project.name} </h6>
                        <div className="fs-sm">Location: Dhaka, Bangladesh</div>
                        <div className="fs-sm">Data: {project.updatedAt} </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default ProjectItem;
