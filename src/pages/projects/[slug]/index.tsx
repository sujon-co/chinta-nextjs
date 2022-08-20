import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import Layout from 'src/components/Common/Layout';
import GalleryView from 'src/components/Gallery';
import MyImage from 'src/components/Image';
import { config } from 'src/config';

interface Props { }
// @ts-ignore
const ProjectDetails: NextPage<GetServerSideProps<typeof getServerSideProps>> = ({ project }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            <Head>
                <title>Aloks&apos;s Vacation House</title>
            </Head>
            <Layout>
                <section className="project-details-section">
                    <div className="container mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <div className="image-wrapper">
                                    <MyImage
                                        className="img-fluid"
                                        src={project.topImage.photoUrl}
                                        alt={project.title}
                                        layout="responsive"
                                        placeholder="blur"
                                        blurDataURL={project?.topImage?.base64}
                                        height={project?.topImage?.height}
                                        width={project?.topImage?.width}
                                    />
                                </div>
                                <div className="content">
                                    <h4> {project.title} </h4>
                                    <div className="other">
                                        <b>Type:</b> {project.type}
                                    </div>
                                    <div className="other">
                                        <b>Status:</b> {project.status}
                                    </div>
                                    <div className="other">
                                        <b>Principal Architect:</b> {project.principalArchitect}
                                    </div>
                                    <div className="other">
                                        <b>Deasign Team:</b> {project.designTeam}
                                    </div>
                                    {project.landscape && (
                                        <div className="other">
                                            <b>Landscape:</b> {project.landscape}
                                        </div>
                                    )}

                                    <div className="other">
                                        <b>Engineer:</b> {project.engineer}
                                    </div>
                                    <div
                                        className="height-wrapper"
                                        style={{
                                            height: showMore ? 105 : 0,
                                        }}
                                    >
                                        <div className="other">
                                            <b>Task Construction Firm: </b>
                                            {project.taskConstructionFirm}
                                        </div>
                                        <div className="other">
                                            <b>Photograph: </b> {project.photograph}
                                        </div>
                                        <div className="other">
                                            <b>Location:</b> Bashundhara, Dhaka,
                                            Bangladesh
                                        </div>
                                        {project.size && (
                                            <div className="other">
                                                <b>Size: </b> {project.size}
                                            </div>
                                        )}
                                        <div className="other">
                                            <b>Year:</b> {project.year}
                                        </div>
                                    </div>
                                    {!showMore && (
                                        <div
                                            className="show-more"
                                            onClick={() => setShowMore(true)}
                                        >
                                            Show More
                                        </div>
                                    )}
                                    {showMore && (
                                        <div
                                            className="show-less"
                                            onClick={() => setShowMore(false)}
                                        >
                                            Show Less
                                        </div>
                                    )}

                                    <div className="row g-3 mt-3 align-items-center">
                                        <div className="col-6 ">
                                            <p> {project.description} </p>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3 image-wrapper">
                                                <MyImage
                                                    src={project.portraitImage.photoUrl}
                                                    alt={project.title}
                                                    layout="responsive"
                                                    placeholder="blur"
                                                    blurDataURL={project?.portraitImage?.base64}
                                                    height={project?.portraitImage?.height}
                                                    width={project?.portraitImage?.width}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="images">
                                    {project.images?.map((image: any, index: any) => (
                                        <div className="image-item image-wrapper" key={index}>
                                            <MyImage

                                                src={image.photoUrl}
                                                alt={project.title}
                                                layout="responsive"
                                                placeholder="blur"
                                                blurDataURL={image?.base64}
                                                height={image?.height}
                                                width={image?.width}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <GalleryView />
                </section>
            </Layout>
        </>
    );
};

export const getServerSideProps = async (ctx: any) => {
    const { data } = await instance.get<{ data: IProject; }>(`/projects/${ctx.params?.slug}`);
    const _project = data.data;

    const _topImage = await getPlaiceholder(`${config.imageUploadUrl}${_project.topImage}`);
    const _portraitImage = await getPlaiceholder(`${config.imageUploadUrl}${_project.portraitImage}`);

    const images = await Promise.all(
        _project.images.map(async (image) => {
            const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${image}`);
            const obj = {
                ...img,
                base64: base64,
                photoUrl: image
            };
            return obj;
        })
    );

    const project = {
        ..._project,
        topImage: {
            ..._topImage.img,
            base64: _topImage.base64,
            photoUrl: _project.topImage
        },
        portraitImage: {
            ..._portraitImage.img,
            base64: _portraitImage.base64,
            photoUrl: _project.portraitImage
        },
        images: images
    };

    return {
        props: {
            project: project
        }

    };
};


export default ProjectDetails;
