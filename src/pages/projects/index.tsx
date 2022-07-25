import { NextPage } from 'next';
import Layout from 'src/components/Common/Layout';
import Projects from 'src/components/Projects';

interface Props {}

const ProjectsPage: NextPage<Props> = () => {
    return (
        <Layout>
            <Projects />
        </Layout>
    );
};

export default ProjectsPage;
