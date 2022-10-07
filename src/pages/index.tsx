import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IAbout, IProject, ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';
import MyImage from 'src/components/Image';
import About from 'src/components/Info/about';
import ProjectItem from 'src/components/ProjectItem';
import { useSizeContext } from 'src/contexts/ResponseContextProvider';
import { scrollHandler } from 'src/utils';
import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const SEL = 'custom-section';
const SECTION_SEL = `.${SEL}`;

const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};

const Final: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({ sliders, about, projects, }) => {
    const [projectHeight, setProjectHeight] = useState(0);
    const { height } = useSizeContext();

    useEffect(() => {
        const imageItem = document.querySelector('.project-item-img .img-fluid');
        const imageItemHeight = imageItem?.clientHeight || 180;
        const images = (height - 145) / imageItemHeight;
        const imageCount = Math.floor(images);

        const totalHeight = imageItemHeight * imageCount + (8 * imageCount);
        setProjectHeight(totalHeight);
    }, [height]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);
    return (
        <div className="App">
            <Head>
                <title>Chinta Sthapatya</title>
            </Head>
            <Header />
            <ReactFullpage
                pluginWrapper={pluginWrapper}
                // anchors={['home', 'about', 'projects', 'contact']}
                scrollBar={false}
                autoScrolling
                scrollOverflowReset
                scrollOverflow
                sectionSelector={SECTION_SEL}
                render={(comp) => (
                    <ReactFullpage.Wrapper>
                        <div className={`${SEL} py-50`} >
                            <div className="container slider-height">
                                <Swiper
                                    autoplay={{ delay: 3000, }}
                                    loop
                                    simulateTouch={false}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {sliders.length > 0 &&
                                        sliders.map((image) => (
                                            <SwiperSlide key={image.photoUrl}>
                                                <div className="slider__item">
                                                    <MyImage
                                                        src={image.photoUrl}
                                                        alt={image.alt}
                                                        layout="responsive"
                                                        width={3840}
                                                        height={2160}
                                                    // preloader={false}
                                                    />
                                                    <div className='slider__item-data'>{image.alt}</div>
                                                </div>
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
                        <div id="projects" className={`${SEL} d-flex`} style={{ paddingTop: '53px', alignItems: "center", justifyContent: 'content' }} >
                            <div className="container ">
                                <div
                                    className="projects"
                                    style={{ height: projectHeight }}
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
                        <div className={`${SEL} contact-section-overwrite`}>
                            <div className="footer-wrapper">
                                <HomePageContact />
                            </div>
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