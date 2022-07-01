import { NextPage } from 'next';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {}

const Slider: NextPage<Props> = () => {
    return (
        <div className="section slider-section">
            <Swiper
                autoplay={{
                    delay: 3000,
                }}
                loop
                simulateTouch={false}
                modules={[Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image src="/sliders/8.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/1.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/2.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/3.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/4.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/5.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/6.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/7.jpg" layout="fill" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/sliders/8.jpg" layout="fill" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
