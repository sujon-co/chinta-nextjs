import { NextPage } from 'next';
import { FaSearch } from 'react-icons/fa';
import Layout from 'src/components/Layout';

interface Props {}

const Projects: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="container">
                <div className="">
                    Search Project
                    <form className="">
                        <div className="feedbackInput">
                            <input type="text" />
                            <button>
                                <FaSearch />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Projects;
