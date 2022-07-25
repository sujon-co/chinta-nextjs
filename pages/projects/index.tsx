import Layout from 'components/Common/Layout';
import Projects from 'components/Projects';
import { NextPage } from 'next';

interface Props {}

const ProjectsPage: NextPage<Props> = () => {
    return (
        <Layout>
            <Projects />
        </Layout>
    );
};

export default ProjectsPage;
