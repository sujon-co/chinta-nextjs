import { NextPage } from 'next';
import { FaSearch } from 'react-icons/fa';
import Layout from 'src/components/Layout';
import ProjectItem from 'src/components/ProjectItem';

interface Props {}

const Projects: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="container search-section">
                <div className="project-search">
                    <div className="search-wrapper">
                        <h4>Search Project</h4>
                        <form className="searchInput">
                            <input type="text" />
                            <button>
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="search-result">
                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 ">
                        {Array(3)
                            .fill('_')
                            .map((item, index) => (
                                <ProjectItem key={index + 1} />
                            ))}
                    </div>
                    {/* <h3 className="text-center">No Result Found!</h3> */}
                </div>
            </div>
        </Layout>
    );
};

export default Projects;
