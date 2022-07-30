/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { useState } from 'react';
import ProjectItem from '../ProjectItem';

type IFilter = 'scrolling' | 'status' | 'location' | 'bar_view';

interface Props {}

const Projects: NextPage<Props> = () => {
    const [filter, setFilter] = useState<IFilter>('status');

    return (
        <div className="container pt-30">
            <div className="projects ">
                {filter === 'scrolling' && (
                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 ">
                        {Array(30)
                            .fill('_')
                            .map((item, index) => (
                                <ProjectItem key={index + 1} />
                            ))}
                    </div>
                )}
                {filter === 'status' && (
                    <div className="project-status">
                        <div className="status-item">
                            <div className="status-project">
                                {Array(66)
                                    .fill('_')
                                    .map((item, index) => (
                                        <div
                                            className="status-project-item border border-dark"
                                            key={index}
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
                {filter === 'location' && (
                    <h3>Filter project base on Location</h3>
                )}
                {filter === 'bar_view' && (
                    <h3>Filter project base on Bar View</h3>
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
                    CHRONOLOGICAL
                </li>
                <li
                    className={`filter-item ${
                        filter === 'bar_view' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('bar_view')}
                >
                    Programmatic
                </li>
            </ul>
        </div>
    );
};

export default Projects;
