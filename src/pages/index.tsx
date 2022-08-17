import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
import { IAbout, ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';
import About from 'src/components/Info/about';
import ProjectItem from 'src/components/ProjectItem';
import { config } from 'src/config';
import { scrollHandler } from 'src/utils';

import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;



// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};

interface Props {


}


const Final: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({ sliderImages, about }) => {

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
                render={(comp) =>
                    <ReactFullpage.Wrapper>
                        <div className={`${SEL}`} style={{ paddingTop: '70px' }}>
                            <div className="container">
                                <Swiper
                                    autoplay={{
                                        delay: 3000,
                                    }}
                                    loop
                                    simulateTouch={false}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {sliderImages.length > 0 && (
                                        sliderImages.map((image) => (
                                            <SwiperSlide key={image.src}>
                                                <img className='img-fluid' src={image.src} alt={image.alt} />
                                            </SwiperSlide>
                                        ))
                                    )}
                                    {sliderImages.length === 0 && (
                                        <h1>Please, Upload Image from dashboard</h1>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                        <div className={SEL}>
                            <div className="container ">
                                <About about={about} />
                            </div>
                        </div>
                        <div id='projects' className={SEL}>
                            <div className="container ">
                                <div className="projects" onWheel={scrollHandler}>
                                    <div className="row g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 ">
                                        {Array(30)
                                            .fill('_')
                                            .map((item, index) => (
                                                <ProjectItem key={index + 1} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={SEL}>
                            <HomePageContact />
                        </div>
                    </ReactFullpage.Wrapper>
                }
            />

        </div>
    );
};

export const getServerSideProps = async () => {
    const { data: sliders } = await instance.get<AxiosResponse<ISlider[]>>(
        '/sliders'
    );
    const { data: _about } = await instance.get<{ data: IAbout[]; }>(
        '/info/about'
    );

    const sliderImages = await Promise.all(
        sliders.data.map(async (data) => {
            const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${data.photoUrl}`);
            return {
                ...img,
                ...data,
                base64: base64,
            };
        })
    );

    const aboutData = _about.data[0];
    const about = await getPlaiceholder(`${config.imageUploadUrl}${aboutData.photoUrl}`).then(
        ({ base64, img }) => {
            return {
                ...img,
                ...aboutData,
                base64: base64,
            };
        }
    );
    return {
        props: {
            sliderImages,
            about
        }
    };
};

export default Final;


