import { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import Projects from 'src/components/Projects';

const ProjectsPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projects }) => {
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
                <div className="container__footer">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async () => {
    const { data: _projects } = await instance.get<{ data: IProject[]; }>(
        '/projects'
    );

    return {
        props: {
            projects: _projects.data,
        },
    };
};

export default ProjectsPage;
