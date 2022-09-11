/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { IProject } from 'server/interface';
import ProjectItem from '../ProjectItem';
import ProjectList from './List';

type IFilter = 'scrolling' | 'status' | 'location' | 'chronological' | 'programmatic';

type status = {
    name: string;
    data: IProject[];
};
interface Props {
    projects: IProject[];
}

const Projects: NextPage<Props> = ({ projects }) => {
    const [filter, setFilter] = useState<IFilter>('scrolling');
    const [status, setStatus] = useState<status[]>([]);
    const [programmatic, setProgrammatic] = useState<status[]>([]);
    const [projectHeight, setProjectHeight] = useState(180 * 3 + (16 * 3));


    useEffect(() => {
        const imageItem = document.querySelector('.project-item-img .img-fluid');
        const imageItemHeight = imageItem?.clientHeight;
        const totalHeight = imageItemHeight ? imageItemHeight * 3 + (14 * 3) : 180 * 3 + (16 * 3);
        setProjectHeight(totalHeight);
    }, []);

    useEffect(() => {

        /*** filter data status */
        const _idea: status = { name: 'Idea', data: [] };
        const _inProgress: status = { name: 'In Progress', data: [] };
        const _underConstruction: status = { name: 'Under Construction', data: [] };
        const _completed: status = { name: 'Completed', data: [] };

        projects.forEach((project) => {
            if (project.status === 'idea') {
                _idea.data.push(project);
            } else if (project.status === 'inProgress') {
                _inProgress.data.push(project);
            } else if (project.status === 'underConstruction') {
                _underConstruction.data.push(project);
            } else if (project.status === 'completed') {
                _completed.data.push(project);
            }
        });

        const statusData = [_idea, _inProgress, _underConstruction, _completed];
        setStatus(statusData);

        /** filter data by programmatic */
        // 'residential' | 'commercial' | 'publicSpace' | 'urbanism' | 'interior'
        const _residential: status = { name: 'Residential', data: [] };
        const _commercial: status = { name: 'Commercial', data: [] };
        const _publicSpace: status = { name: 'Public Space', data: [] };
        const _urbanism: status = { name: 'Urbanism', data: [] };
        const _interior: status = { name: 'Interior', data: [] };

        projects.forEach((project) => {
            if (project.type === 'residential') {
                _residential.data.push(project);
            } else if (project.type === 'commercial') {
                _commercial.data.push(project);
            } else if (project.type === 'publicSpace') {
                _publicSpace.data.push(project);
            } else if (project.type === 'urbanism') {
                _urbanism.data.push(project);
            } else if (project.type === 'interior') {
                _interior.data.push(project);
            }
        });

        const programmaticData = [_residential, _commercial, _publicSpace, _urbanism, _interior];
        setProgrammatic(programmaticData);



    }, [projects, filter]);
    console.log({ status });

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
                        {status.map((status, index) => (
                            <div className="status-item" key={index}>
                                <div className="status-project">
                                    <ProjectList projects={status.data} />
                                </div>
                                <div className="status-title"> {status.name} </div>
                            </div>
                        ))}
                    </div>
                )}
                {filter === 'programmatic' && (
                    <div className="project-status">
                        {programmatic.map((status, index) => (
                            <div className="status-item" key={index}>
                                <div className="status-project">
                                    <ProjectList projects={status.data} />
                                </div>
                                <div className="status-title"> {status.name} </div>
                            </div>
                        ))}

                    </div>
                )}
                {filter === 'location' && <div>Under Development...</div>}
                {filter === 'chronological' && (
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
                    className={`filter-item ${filter === 'chronological' ? 'active' : ''}`}
                    onClick={() => setFilter('chronological')}
                >
                    Chronological
                </li>
            </ul>
        </div>
    );
};

export default Projects;
