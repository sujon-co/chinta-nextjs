import { InferGetServerSidePropsType, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import Projects from 'src/components/Projects';
import { config } from 'src/config';

const ProjectsPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projects }) => {
    return (
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
    );
};

export const getServerSideProps = async () => {
    const { data: _projects } = await instance.get<{ data: IProject[] }>(
        '/projects'
    );
    const projects = await Promise.all(
        _projects.data.map(async (data) => {
            const { base64, img } = await getPlaiceholder(
                `${config.imageUploadUrl}${data.topImage}`
            );
            return {
                ...data,
                topImage: {
                    ...img,
                    base64: base64,
                    photoUrl: data.topImage,
                },
            };
        })
    );
    return {
        props: {
            projects,
        },
    };
};

export default ProjectsPage;
