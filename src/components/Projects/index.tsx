/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { memo, useEffect, useState } from 'react';
import { IProject } from 'server/interface';
import GridItem from '../GridItem';
import ProjectItem from '../ProjectItem';

type IFilter = 'scrolling' | 'status' | 'location' | 'chronological' | 'programmatic';

export type status = {
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
    const [chronological, setChronological] = useState<status[]>([]);
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

        /** Chronological */
        const _projects: IProject[] = projects.sort((a, b) => {
            return a.year - b.year;
        });

        const years = _projects.reduce((total, item) => {
            if (total[item.year]) {
                total[item.year].data.push(item);
            } else {
                total[item.year] = { name: item.year, data: [item] };
            }
            return total;
        }, {} as any);
        setChronological(Object.values(years));

    }, [projects]);
    console.log("Render");

    return (
        <div className="container">
            <div className="projects" style={{ height: projectHeight }}>
                {filter === 'scrolling' && (
                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 ">
                        {projects.map((project, index) => (
                            <ProjectItem
                                project={project}
                                key={Math.random() + index}
                            />
                        ))}
                    </div>
                )}
                {filter === 'status' && (
                    <div className="grids" >
                        {status.map((data, index) => (
                            data.data.length > 0 && <GridItem item={data} key={index} height={projectHeight} />
                        ))}
                    </div>
                )}
                {filter === 'programmatic' && (
                    <div className="grids" >
                        {programmatic.map((data, index) => (
                            data.data.length > 0 && <GridItem item={data} key={index} height={projectHeight} />
                        ))}
                    </div>
                )}
                {filter === 'chronological' && (
                    <div className="grids" >
                        {chronological.map((data, index) => (
                            <GridItem item={data} key={index} height={projectHeight} />
                        ))}
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
                <li
                    className={`filter-item ${filter === 'chronological' ? 'active' : ''}`}
                    onClick={() => setFilter('chronological')}
                >
                    Chronological
                </li>
                <li
                    className={`filter-item ${filter === 'location' ? 'active' : ''}`}
                // onClick={() => setFilter('location')}
                >
                    Location
                </li>
            </ul>
        </div>
    );
};

export default memo(Projects);

