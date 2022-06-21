import { NextPage } from 'next';
import ProjectItem from '../ProjectItem';

interface Props {}

const Projects: NextPage<Props> = () => {
    return (
        <div className="container">
            <div className="projects">
                <div className="row g-3  row-cols-5 ">
                    {Array(30)
                        .fill('_')
                        .map((item, index) => (
                            <ProjectItem key={index + 1} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
