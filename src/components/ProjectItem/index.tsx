import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import projectImage from '/public/projects/image2.png';

interface Props {}

const ProjectItem: NextPage<Props> = () => {
    return (
        <Link href={'/projects/project-item'}>
            <a className="project-item">
                <div className="project-item-img">
                    <Image
                        className="img-fluid"
                        src={projectImage}
                        layout="responsive"
                        alt="project"
                    />
                    <div className="project-item-overlay">
                        <h6>This is a Project</h6>
                        <div className="fs-sm">Location: Dhaka, Bangladesh</div>
                        <div className="fs-sm">Data: 15/06/22</div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default ProjectItem;
