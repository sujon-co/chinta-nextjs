import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import ReactPageScroller from 'react-page-scroller';
import { IAbout, ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import About from 'src/components/Info/about';
import ProjectItem from 'src/components/ProjectItem';
import { config } from 'src/config';

import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {

}

const Test: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({ sliderImages, about }) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Header />
            <div className="demo-page-contain">

                <ReactPageScroller
                    pageOnChange={handlePageChange}
                    // containerWidth={window.innerWidth}
                    // containerHeight={window.innerHeight}
                    // animationTimer={500}
                    renderAllPagesOnFirstRender
                    customPageNumber={currentPage}
                >
                    <div className="component first-component">
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
                    <div className="component second-component">
                        <div className="container ">
                            <About about={about} />
                        </div>
                    </div>
                    <div className="component third-component">
                        <div className="container">
                            <div className="row  g-2 g-sm-3  row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                                {Array(15)
                                    .fill('_')
                                    .map((item, index) => (
                                        <ProjectItem key={index + 1} />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="component fourth-component">
                        <h2>Third Component</h2>
                    </div>
                    <div className="component fifth-component">
                        <h2>Third Component</h2>
                    </div>
                </ReactPageScroller>
            </div>
        </>
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


export default Test;
