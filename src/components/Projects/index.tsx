/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { useState } from 'react';
import ProjectItem, { IProjectItem } from '../ProjectItem';

type IFilter =
    | 'scrolling'
    | 'status'
    | 'location'
    | 'bar_view'
    | 'programmatic';

interface Props {
    projects: IProjectItem[];
}

const Projects: NextPage<Props> = ({ projects }) => {
    const [filter, setFilter] = useState<IFilter>('scrolling');

    return (
        <div className="container">
            <div className="projects" style={{ height: '500px' }}>
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
                            <div className="status-title">IDEA</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project"></div>
                            <div className="status-title"> In Progress</div>
                        </div>
                        <div className="status-item">
                            <div className="status-project"></div>
                            <div className="status-title">
                                Under Construction
                            </div>
                        </div>
                        <div className="status-item">
                            <div className="status-project"></div>
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
                    <h3>Developer now sleeping ... :))</h3>
                )}
            </div>
            <ul className="project-filter">
                <li
                    className={`filter-item ${
                        filter === 'scrolling' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('scrolling')}
                >
                    Scrolling-Grid
                </li>
                <li
                    className={`filter-item ${
                        filter === 'status' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('status')}
                >
                    Status
                </li>
                <li
                    className={`filter-item ${
                        filter === 'programmatic' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('programmatic')}
                >
                    Programmatic
                </li>
                <li
                    className={`filter-item ${
                        filter === 'location' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('location')}
                >
                    Location
                </li>
                <li
                    className={`filter-item ${
                        filter === 'bar_view' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('bar_view')}
                >
                    Chronological
                </li>
            </ul>
        </div>
    );
};

export default Projects;
