import { NextPage } from 'next';
import Image from 'next/image';
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
                {sliderImages.map((image) => (
                    <SwiperSlide key={image.src}>
                        <Image
                            src={image.src}
                            layout="fill"
                            alt={image.alt}
                            placeholder="blur"
                            blurDataURL={image.base64}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
