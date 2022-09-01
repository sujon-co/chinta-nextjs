import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { IAbout, IProject, ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';
import MyImage from 'src/components/Image';
import About from 'src/components/Info/about';
import ProjectItem from 'src/components/ProjectItem';
import { scrollHandler } from 'src/utils';
// import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const SEL = 'custom-section';
const SECTION_SEL = `.${SEL}`;

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};

const Final: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
    sliders,
    about,
    projects,
}) => {
    const onLeave = (origin: any, destination: any, direction: any) => {
        // console.log('onLeave', { origin, destination, direction });
    };

    const moveSectionDown = () => {
        //@ts-ignore
        fullpage_api.moveSectionDown();
    };

    return (
        <div className="App">
            <Head>
                <title>Chinta Sthapatya</title>
            </Head>
            <Header />
            <ReactFullpage
                pluginWrapper={pluginWrapper}
                onLeave={onLeave}
                scrollBar={false}
                autoScrolling
                scrollOverflowReset
                scrollOverflow
                sectionSelector={SECTION_SEL}
                render={(comp) => (
                    <ReactFullpage.Wrapper>
                        <div className={`${SEL} py-50`}>
                            <div className="container" style={{ height: '100%' }}>
                                <Swiper
                                    autoplay={{
                                        delay: 3000,
                                    }}
                                    loop
                                    simulateTouch={false}
                                    // modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {sliders.length > 0 &&
                                        sliders.map((image) => (
                                            <SwiperSlide key={image.photoUrl}>
                                                {/* <img
                                                    className="img-fluid"
                                                    src={`${config.imageUploadUrl}${image.photoUrl}`}
                                                    alt={image.alt}
                                                /> */}
                                                <MyImage
                                                    src={image.photoUrl}
                                                    alt={image.alt}
                                                    layout="fill"
                                                    width={3840}
                                                    height={2160}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    {sliders.length === 0 && (
                                        <h1>
                                            Please, Upload Image from dashboard
                                        </h1>
                                    )}
                                </Swiper>
                            </div>
                        </div>

                        <div className={`${SEL} about-section-overwrite`}>
                            <div className="container ">
                                <About about={about} />
                            </div>
                        </div>
                        <div id="projects" className={SEL}>
                            <div className="container ">
                                <div
                                    className="projects"
                                    onWheel={scrollHandler}
                                >
                                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 ">
                                        {projects.map((project, index) => (
                                            <ProjectItem
                                                project={project}
                                                key={index + 1}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={SEL}>
                            <HomePageContact />
                        </div>
                    </ReactFullpage.Wrapper>
                )}
            />
        </div>
    );
};

export const getServerSideProps = async () => {
    const { data: sliders } = await instance.get<AxiosResponse<ISlider[]>>('/sliders');
    const { data: _about } = await instance.get<{ data: IAbout[]; }>('/info/about');
    const { data: projects } = await instance.get<{ data: IProject[]; }>('/projects');

    return {
        props: {
            sliders: sliders.data,
            about: _about.data[0],
            projects: projects.data,
        },
    };
};

export default Final;
