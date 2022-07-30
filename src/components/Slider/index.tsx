import { NextPage } from 'next';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import MyImage from '../Image';

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
                            <MyImage
                                src={image.photoUrl}
                                layout="fill"
                                alt={image.alt}
                                placeholder="blur"
                                blurDataURL={image.base64}
                                height={image.height}
                                width={image.width}
                            />
                        </SwiperSlide>
                    ))
                )}
                {sliderImages.length === 0 && (
                    <h1>Upload Image from dashboard</h1>
                )}
            </Swiper>
        </div>
    );
};

export default Slider;
