import { NextPage } from 'next';
import { useState } from 'react';
import ProjectItem from '../ProjectItem';

type IFilter = 'scrolling' | 'status' | 'location' | 'bar_view';

interface Props {}

const Projects: NextPage<Props> = () => {
    const [filter, setFilter] = useState<IFilter>('scrolling');

    return (
        <div className="container">
            <div className="projects">
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
                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 ">
                        {Array(30)
                            .fill('_')
                            .map((item, index) => (
                                <ProjectItem key={index + 1} />
                            ))}
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
                    Bar View
                </li>
            </ul>
        </div>
    );
};

export default Projects;
