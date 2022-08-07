import { NextPage } from 'next';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import Projects from 'src/components/Projects';

interface Props { }

const ProjectsPage: NextPage<Props> = () => {
    return (
        <div className="page-wrapper">
            <div className="container__header">
                <Header />
            </div>
            <div className="container__main">
                <Projects />
            </div>
            <div className="container__footer">
                <Footer />
            </div>
        </div>
    );
};

export default ProjectsPage;
