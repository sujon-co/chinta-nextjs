import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import instance from 'src/api/httpService';
import Layout from 'src/components/Common/Layout';
import ProjectItem, { IProjectItem } from 'src/components/ProjectItem';

interface Props {}

const Search: NextPage<Props> = () => {
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.query.query) {
            setIsLoading(true);
            (async () => {
                const { data } = await instance.get<{ data: any }>(
                    `projects/search/${router.query.query}`
                );
                setProjects(data.data);
                setIsLoading(false);
            })();
        }
    }, [router.query.query]);

    console.log({ projects, isLoading, query: router.query.query });

    return (
        <Layout>
            <div
                className="container search-section"
                style={{ paddingTop: 120 }}
            >
                <div className="search-result">
                    {isLoading && (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                    {!isLoading && (
                        <>
                            {projects.length > 0 ? (
                                <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 ">
                                    {projects.map((project: IProjectItem) => (
                                        <ProjectItem
                                            project={project}
                                            key={project.portraitImage}
                                            isNextImage={false}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h5 className="text-center">
                                    No Result Found!
                                </h5>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Search;
