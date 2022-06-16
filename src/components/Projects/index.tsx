import { NextPage } from 'next';
import ProjectItem from '../ProjectItem';

interface Props {}

const Projects: NextPage<Props> = () => {
    return (
        <div className="container">
            <div className="projects">
                <div className="row g-3">
                    {Array(30)
                        .fill('_')
                        .map((item, index) => (
                            <div className="col-md-3" key={index + 1}>
                                <ProjectItem />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
