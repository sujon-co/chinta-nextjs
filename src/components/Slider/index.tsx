/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
    sliderImages: {
        base64: string;
        alt: string;
        src: string;
        height: number;
        photoUrl: string;
        width: number;
        type?: string | undefined;
    }[];
}

const Slider: NextPage<Props> = ({ sliderImages }) => {
    return (
        <div className="section slider-section pt-0">
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
    );
};

export default Slider;
