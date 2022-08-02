import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import ReactPageScroller from 'react-page-scroller';
import { ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import { config } from 'src/config';

import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {

}

const Test: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({ sliderImages }) => {
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
                                    <h1>Upload Image from dashboard</h1>
                                )}
                            </Swiper>
                        </div>
                    </div>
                    <div className="component second-component">
                        <h2>Second Component</h2>
                    </div>
                    <div className="component third-component">
                        <h2>Third Component</h2>
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
    return {
        props: {
            sliderImages
        }
    };
};


export default Test;
