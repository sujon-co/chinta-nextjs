import { NextPage } from 'next';
import { FaSearch } from 'react-icons/fa';
import Layout from 'src/components/Layout';

interface Props {}

const Projects: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="container">
                <div className="project-search">
                    Search Project
                    <form className="searchInput">
                        <input type="text" />
                        <button>
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Projects;
