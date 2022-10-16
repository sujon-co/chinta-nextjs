import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { VscChevronLeft, VscChevronRight, VscClose } from 'react-icons/vsc';
import { IProject } from 'server/interface';
import instance from 'src/api/httpService';
import Layout from 'src/components/Common/Layout';
import GalleryImage from 'src/components/GalleryImage';
import MyImage from 'src/components/Image';
import { config } from 'src/config';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Props { }
// @ts-ignore
const ProjectDetails: NextPage<GetServerSideProps<typeof getServerSideProps>> = ({ project }) => {
    const [showMore, setShowMore] = useState(false);
    const [index, setIndex] = useState(-1);
    const [indexNumber, setIndexNumber] = useState(1);
    const showRef = useRef<HTMLDivElement | null>(null);

    const slides = project.gallery?.map((item: any) => ({ src: config.imageUploadUrl + item, photoUrl: item }));

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        showMore ? window.scrollTo({ top: 150, behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [showMore]);

    const data = project.images.split(',')?.map((number: string) => ({ src: project.gallery[parseInt(number)], index: parseInt(number) }));

    return (
        <>
            <Head>
                <title> {project.name} </title>
            </Head>
            <Layout>
                <section className="project-details-section">
                    <div className="container">
                        <div className='top-image-wrapper'>
                            <div className="row">
                                <div className="col-12">
                                    {project.gallery[project.topImage - 1] ? project.gallery[project.topImage - 1] && (
                                        <div className="top-image-height-control">
                                            <div className="top-img-overwrite">
                                                <MyImage
                                                    className="img-fluid cursor-zoom"
                                                    src={project.gallery[project.topImage - 1]}
                                                    alt={project.title}
                                                    layout="responsive"
                                                    placeholder="blur"
                                                    onClick={() => setIndex(project.topImage - 1)}
                                                    objectFit="cover"
                                                />
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="content">
                                        <h5 className="pt-2"> {project.name} </h5>
                                        <div className="other">
                                            <b>Type:</b> {project.type}
                                        </div>
                                        <div className="other">
                                            <b>Status:</b> {project.status}
                                        </div>
                                        <div className="other">
                                            <b>Principal Architect:</b> {project.principalArchitect}
                                        </div>
                                        {project.designTeam && (
                                            <div className="other">
                                                <b>Deasign Team:</b> {project.designTeam}
                                            </div>
                                        )}

                                        <div className="height-wrapper" style={{ maxHeight: showMore ? 105 : 0, }} >
                                            {project.landscape && (
                                                <div className="other">
                                                    <b>Landscape:</b> {project.landscape}
                                                </div>
                                            )}
                                            {project.engineer && (
                                                <div className="other">
                                                    <b>Engineer:</b> {project.engineer}
                                                </div>
                                            )}
                                            {project.taskConstructionFirm && (
                                                <div className="other">
                                                    <b>Task Construction Firm: </b>
                                                    {project.taskConstructionFirm}
                                                </div>
                                            )}
                                            {project.photograph && (
                                                <div className="other">
                                                    <b>Photograph: </b> {project.photograph}
                                                </div>
                                            )}
                                            {project?.location && (
                                                <div className="other">
                                                    <b>Location:</b> {project.location}
                                                </div>
                                            )}

                                            {project.size && (
                                                <div className="other">
                                                    <b>Size: </b> {project.size}
                                                </div>
                                            )}
                                            <div className="other">
                                                <b>Year:</b> {project.year}
                                            </div>
                                        </div>
                                        <div ref={showRef} className="show-more" onClick={handleShowMore} >
                                            {showMore ? 'Show Less' : 'Show More'}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="portrait-wrapper">
                            <div>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-6 ">
                                        <div dangerouslySetInnerHTML={{ __html: project.description }} />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="portrait-image-height">
                                            {project.gallery[project.portraitImage - 1] && (
                                                <MyImage
                                                    className="cursor-zoom"
                                                    src={project.gallery[project.portraitImage - 1]}
                                                    alt={project.title}
                                                    layout="responsive"
                                                    placeholder="blur"
                                                    objectFit='cover'
                                                    onClick={() => setIndex(project.portraitImage - 1)}
                                                />
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {project.video && (
                            <div className='video-player-controller' >
                                <ReactPlayer
                                    url={project.video}
                                    className='react-player'
                                    playing
                                    width='100%'
                                    height='80vh'
                                />
                            </div>
                        )}

                        {project.images.split(',')?.map((number: string) => ({ src: project.gallery[parseInt(number)], index: parseInt(number) })).map((image: any, index: number) => (
                            image.src && (
                                <div className='image-height-control' key={index}>
                                    <div className="image-overwrite" style={{ width: '100%' }}>
                                        <MyImage
                                            className='img-fluid cursor-zoom'
                                            src={image.src}
                                            alt={project.title}
                                            layout="responsive"
                                            placeholder="blur"
                                            height={1500}
                                            width={2500}
                                            onClick={() => setIndex(image.index)}
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                            )
                        ))}

                    </div>

                    <div className="container">
                        <h5 className='my-3'>Project gallery</h5>
                        <div className="gallery-list">
                            {slides.map((img: any, index: number) => (
                                <GalleryImage img={img} index={index} setIndex={setIndex} key={index} alt={project.name} />
                            ))}
                        </div>
                    </div>

                    <Lightbox
                        open={index >= 0}
                        index={index}
                        close={() => setIndex(-1)}
                        slides={slides}
                        fullscreen={false}
                        plugins={[Fullscreen]}
                        animation={{ fade: 0, swipe: 0 }}
                        render={{
                            iconPrev: () => <VscChevronLeft style={{ fontSize: '35px' }} />,
                            iconNext: () => <VscChevronRight style={{ fontSize: '35px' }} />,
                            iconClose: () => <VscClose style={{ fontSize: '35px' }} />
                        }}
                        on={{
                            view: (index) => {
                                setIndexNumber(index + 1);
                            }
                        }}
                    />
                    {index > -1 && (
                        <h6 className='index-number'> {indexNumber} of {slides.length} </h6>
                    )}

                </section>
            </Layout>
        </>
    );
};

export const getServerSideProps = async (ctx: any) => {
    const { data } = await instance.get<{ data: IProject; }>(`/projects/${ctx.params?.slug}`);
    const _project = data.data;


    return {
        props: {
            project: _project
        }
    };

    // if (_project) {
    //     const gallery = await Promise.all(
    //         _project?.gallery.map(async (image) => {
    //             const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${image}`);
    //             const obj = {
    //                 ...img,
    //                 base64: base64,
    //                 photoUrl: image
    //             };
    //             return obj;
    //         })
    //     );

    //     const project = {
    //         ..._project,
    //         gallery: gallery
    //     };

    //     return {
    //         props: {
    //             project: project
    //         }

    //     };
    // } else {
    //     return {
    //         props: {
    //             project: {}
    //         }
    //     };
    // }
};


export default ProjectDetails;



