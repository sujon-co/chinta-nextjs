/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { IProject } from 'server/interface';
import ProjectItem from '../ProjectItem';
import ProjectList from './List';

type IFilter =
    | 'scrolling'
    | 'status'
    | 'location'
    | 'bar_view'
    | 'programmatic';

interface Props {
    projects: IProject[];
}

const Projects: NextPage<Props> = ({ projects }) => {
    const [filter, setFilter] = useState<IFilter>('scrolling');
    const [ideaData, setIdeaData] = useState<IProject[]>([]);
    const [inProgress, setInProgress] = useState<IProject[]>([]);
    const [underConstruction, setUnderConstruction] = useState<IProject[]>([]);
    const [completed, setCompleted] = useState<IProject[]>([]);
    const [projectHeight, setProjectHeight] = useState(180 * 3 + (16 * 3));


    useEffect(() => {
        const imageItem = document.querySelector('.project-item-img .img-fluid');
        const imageItemHeight = imageItem?.clientHeight;
        const totalHeight = imageItemHeight ? imageItemHeight * 3 + (14 * 3) : 180 * 3 + (16 * 3);
        setProjectHeight(totalHeight);
    }, []);

    useEffect(() => {
        const _ideaData = projects.filter((project) => project.status === 'idea');
        const _inProgress = projects.filter((project) => project.status === 'inProgress');
        const _underConstruction = projects.filter((project) => project.status === 'underConstruction');
        const _completed = projects.filter((project) => project.status === 'completed');

        setIdeaData(_ideaData);
        setInProgress(_inProgress);
        setUnderConstruction(_underConstruction);
        setCompleted(_completed);

    }, [projects, filter]);


    return (
        <div className="container">
            <div className="projects" style={{ height: projectHeight }}>
                {filter === 'scrolling' && (
                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 ">
                        {projects.map((project, index) => (
                            <ProjectItem
                                project={project}
                                key={project.portraitImage}
                            />
                        ))}
                    </div>
                )}
                {filter === 'status' && (
                    <div className="project-status">
                        <div className="status-item">
                            <div className="status-project">
                                <ProjectList projects={ideaData.slice(0, 14)} />
                            </div>
                            <div className="status-title">Idea</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project">
                                <ProjectList projects={inProgress} />
                            </div>
                            <div className="status-title"> In Progress</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project">
                                <ProjectList projects={underConstruction} />
                            </div>
                            <div className="status-title">
                                Under Construction
                            </div>
                        </div>
                        <div className="status-item">
                            <div className="status-project">
                                <ProjectList projects={completed} />
                            </div>
                            <div className="status-title">Completed</div>
                        </div>
                    </div>
                )}
                {filter === 'programmatic' && (
                    <div className="project-status">
                        <div className="status-item">
                            <div className="status-project">
                                {Array(15)
                                    .fill('_')
                                    .map((item, index) => (
                                        <div
                                            className="status-project-item"
                                            key={index + 1}
                                        >
                                            <img
                                                src="/projects/18.jpeg"
                                                className="status-project-item-img "
                                                alt="project"
                                                title="project"
                                                height={50}
                                                width={50}
                                            />
                                            <div className="status-project-item-title">
                                                SKI
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="status-title">Residential</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project">
                                {Array(15)
                                    .fill('_')
                                    .map((item, index) => (
                                        <div
                                            className="status-project-item"
                                            key={index + 1}
                                        >
                                            <img
                                                src="/projects/18.jpeg"
                                                className="status-project-item-img "
                                                alt="project"
                                                title="project"
                                                height={50}
                                                width={50}
                                            />
                                            <div className="status-project-item-title">
                                                SKI
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="status-title"> Commercial</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project">
                                {Array(10)
                                    .fill('_')
                                    .map((item, index) => (
                                        <div
                                            className="status-project-item"
                                            key={index + 1}
                                        >
                                            <img
                                                src="/projects/18.jpeg"
                                                className="status-project-item-img "
                                                alt="project"
                                                title="project"
                                                height={50}
                                                width={50}
                                            />
                                            <div className="status-project-item-title">
                                                SKI
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="status-title">Public Space</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project">
                                {Array(5)
                                    .fill('_')
                                    .map((item, index) => (
                                        <div
                                            className="status-project-item"
                                            key={index + 1}
                                        >
                                            <img
                                                src="/projects/18.jpeg"
                                                className="status-project-item-img "
                                                alt="project"
                                                title="project"
                                                height={50}
                                                width={50}
                                            />
                                            <div className="status-project-item-title">
                                                SKI
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="status-title">Urbanism</div>
                        </div>
                    </div>
                )}
                {filter === 'location' && <div>Under Development...</div>}
                {filter === 'bar_view' && (
                    <div className="container">
                        <div className="projects">
                            <div>Under Developer up coming </div>
                        </div>
                    </div>
                )}
            </div>
            <ul className="project-filter">
                <li
                    className={`filter-item ${filter === 'scrolling' ? 'active' : ''}`}
                    onClick={() => setFilter('scrolling')}
                >
                    Scrolling-Grid
                </li>
                <li
                    className={`filter-item ${filter === 'status' ? 'active' : ''}`}
                    onClick={() => setFilter('status')}
                >
                    Status
                </li>
                <li
                    className={`filter-item ${filter === 'programmatic' ? 'active' : ''}`}
                    onClick={() => setFilter('programmatic')}
                >
                    Programmatic
                </li>
                {/* <li
                    className={`filter-item ${filter === 'location' ? 'active' : '' }`}
                    onClick={() => setFilter('location')}
                >
                    Location
                </li> */}
                <li
                    className={`filter-item ${filter === 'bar_view' ? 'active' : ''}`}
                    onClick={() => setFilter('bar_view')}
                >
                    Chronological
                </li>
            </ul>
        </div>
    );
};

export default Projects;
