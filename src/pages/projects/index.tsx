import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import Projects from 'src/components/Projects';

interface Props {
    projects: IProject[];
}

const ProjectsPage: NextPage<Props> = ({ projects }) => {
    const [_projects, setProjects] = useState<IProject[]>([]);


    useEffect(() => {
        // sort by year
        const sortedProjects = projects.sort((a, b) => b.year - a.year);
    }, [projects]);

    return (
        <>
            <Head>
                <title>Chinta Sthapatya</title>
            </Head>
            <div className="page-wrapper">
                <div className="container__header">
                    <Header />
                </div>
                <div className="container__main">
                    <Projects projects={projects} />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async () => {
    const { data } = await instance.get<{ data: IProject[]; }>('/projects');

    return {
        props: {
            projects: data.data
        },
    };
};

export default ProjectsPage;
