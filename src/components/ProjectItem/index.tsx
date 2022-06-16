import { NextPage } from 'next';
import Image from 'next/image';
import projectImage from '/public/projects/image2.png';

interface Props {}

const ProjectItem: NextPage<Props> = () => {
    return (
        <div className="project-item">
            <div className="project-item-img">
                <Image className='img-fluid' src={projectImage} alt="project" />
            </div>
            <div className="project-item-overlay">
                <h6>This is a Project</h6>
                <div className="fs-sm">Location: Dhaka, Bangladesh</div>
                <div className="fs-sm">Data: 15/06/22</div>
            </div>
        </div>
    );
};

export default ProjectItem;
