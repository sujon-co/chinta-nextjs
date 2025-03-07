/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { IProject } from 'server/interface';
import GridItem from '../GridItem';
import ProjectItem from '../ProjectItem';

type IFilter = 'scrolling' | 'status' | 'location' | 'chronological' | 'programmatic' | 'alphabetical';

export type status = {
    name: string;
    data: IProject[];
};
interface Props {
    projects: IProject[];
}

const Projects: NextPage<Props> = ({ projects }) => {
    const [filter, setFilter] = useState<IFilter>('scrolling' as any);
    const [status, setStatus] = useState<status[]>([]);
    const [programmatic, setProgrammatic] = useState<status[]>([]);
    const [chronological, setChronological] = useState<status[]>([]);
    const [projectHeight, setProjectHeight] = useState(180 * 3 + (8 * 3));
    const [alphabetical, setAlphabetical] = useState<status[]>([]);


    useEffect(() => {
        const _filter: any = localStorage.getItem('chinta-filter');
        if (_filter) {
            setFilter(_filter);
        } else {
            localStorage.setItem('chinta-filter', 'scrolling');
        }
    }, []);

    useEffect(() => {
        const imageItem = document.querySelector('.project-item-img .img-fluid');
        const imageItemHeight = imageItem?.clientHeight;
        const totalHeight = imageItemHeight ? imageItemHeight * 3 + (8 * 3) : 180 * 3 + (8 * 3);
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
            } else if (project.status === 'in progress') {
                _inProgress.data.push(project);
            } else if (project.status === 'under construction') {
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
            } else if (project.type === 'public space') {
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


    useEffect(() => {
        const sortedProjects = projects.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        const alphabetOrderSort = sortedProjects.reduce((total, item) => {
            const firstLetter = item.name[0].toUpperCase();
            if (total[firstLetter]) {
                total[firstLetter].data.push(item);
            } else {
                total[firstLetter] = { name: firstLetter, data: [item] };
            }
            return total;
        }, {} as any);
        setAlphabetical(Object.values(alphabetOrderSort));

    }, [projects]);

    const handleFilter = (name: IFilter) => {
        setFilter(name);
        localStorage.setItem('chinta-filter', name);
    };

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
                {filter === 'chronological' && (
                    <div className="grids" >
                        {chronological.map((data, index) => (
                            <GridItem item={data} key={index} height={projectHeight} />
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
                {filter === 'alphabetical' && (
                    <div className="grids" >
                        {alphabetical.map((data, index) => (
                            data.data.length > 0 && <GridItem item={data} key={index} height={projectHeight} />
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

            </div>
            <ul className="project-filter">
                <li
                    className={`filter-item ${filter === 'scrolling' ? 'active' : ''}`}
                    onClick={() => handleFilter('scrolling')}
                >
                    Scrolling-grid
                </li>
                <li
                    className={`filter-item ${filter === 'chronological' ? 'active' : ''}`}
                    onClick={() => handleFilter('chronological')}
                >
                    Chronological
                </li>
                <li
                    className={`filter-item ${filter === 'alphabetical' ? 'active' : ''}`}
                    onClick={() => handleFilter('alphabetical')}
                >
                    Alphabetical
                </li>
                <li
                    className={`filter-item ${filter === 'programmatic' ? 'active' : ''}`}
                    onClick={() => handleFilter('programmatic')}
                >
                    Programmatic
                </li>
                <li
                    className={`filter-item ${filter === 'status' ? 'active' : ''}`}
                    onClick={() => handleFilter('status')}
                >
                    Status
                </li>


                <li
                    className={`filter-item ${filter === 'location' ? 'active' : ''}`}
                // onClick={() => handleFilter('location')}
                >
                    Location
                </li>
            </ul>
        </div>
    );
};

export default Projects;

