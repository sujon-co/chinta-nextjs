import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import { IAbout, ISlider } from 'server/interface';
import instance from 'src/api/httpService';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import About from 'src/components/Info/about';
import ProjectItem from 'src/components/ProjectItem';
import { config } from 'src/config';

import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};

interface Props {


}
const originalColors = [
    'blue',
    '#0798ec',
    '#fc6c7c',
    '#435b71',
    'orange',
    'blue',
    'purple',
    'yellow',
];

const Final: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({ sliderImages, about }) => {
    const [sectionsColor, setSectionsColor] = useState(originalColors);
    const [showInput, setShowInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const onLeave = (origin: any, destination: any, direction: any) => {
        // console.log('onLeave', { origin, destination, direction });
        // arguments are mapped in order of fullpage.js callback arguments do something
        // with the event
    };

    const moveSectionDown = () => {
        //@ts-ignore
        fullpage_api.moveSectionDown();
    };
    const Menu = () => (
        <div
            className="menu"
            style={{
                position: 'fixed',
                top: 0,
                zIndex: 100,
            }}
        >
            <ul className="actions">
                <li>
                    <button onClick={() => moveSectionDown()}>
                        Move Section Down
                    </button>
                </li>
            </ul>
        </div>
    );

    return (
        <div className="App">
            <Head>
                <title>My styled page</title>
            </Head>
            <Header />
            <ReactFullpage
                pluginWrapper={pluginWrapper}
                onLeave={onLeave}
                scrollBar={false}
                autoScrolling
                scrollOverflowReset
                // continuousVertical
                // scrollHorizontally
                // normalScrollElements='#projects'
                scrollOverflow
                // scrollHorizontally = {true}
                // sectionsColor={sectionsColor}
                render={(comp) =>
                    <ReactFullpage.Wrapper>
                        <div className="section slider-section">
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
                        <div className="section about-section">
                            <div className="container ">
                                <About about={about} />
                            </div>
                        </div>
                        <div id='projects' className="section project-section">
                            <div className="container ">
                                <div className="projects" style={{ height: '500px' }} onWheel={function (e) {

                                    let flag = true;
                                    if (e.deltaY < 0 && e.currentTarget.scrollTop === 0) {
                                        console.log('scrolling up');
                                        flag = false;
                                    }
                                    else if (e.deltaY > 0 && e.currentTarget.scrollHeight <= (e.currentTarget.scrollTop + e.currentTarget.clientHeight)) {
                                        console.log('scrolling down');
                                        flag = false;
                                    }
                                    console.log({ h: e.currentTarget.scrollHeight, t: e.currentTarget.scrollTop, tc: e.currentTarget.scrollTop + e.currentTarget.clientHeight });
                                    if (flag) {
                                        e.stopPropagation();
                                    }
                                    // if (e.target.scrollHeight === e.target.scrollTop || e.target.scrollTop === 0) {
                                    //     console.log({ h: e.target.scrollHeight, t: e.target.scrollTop })
                                    // } else {
                                    //     e.stopPropagation()
                                    // }
                                }}>
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
                        <div className="section ">
                            <div className="container contact-container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="wrapper">
                                            <div className="text-box">
                                                <p className="p-0 mb-0">{message}</p>
                                            </div>
                                            <div className="drop-message-wrapper">
                                                <div
                                                    className="tagline"
                                                    v-show="!show"
                                                    style={{
                                                        display: showInput ? 'none' : 'block',
                                                    }}
                                                    onClick={() => setShowInput(true)}
                                                >
                                                    <p>DROP US A LINE</p>
                                                </div>
                                                <div
                                                    className="feedbackInput"
                                                    style={{
                                                        display: showInput ? 'block' : 'none',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        v-model="feedbacktxt"
                                                        onChange={(e) =>
                                                            setMessage(e.target.value)
                                                        }
                                                    />
                                                    <button onClick={() => setShowModal(true)}>
                                                        &#9654;
                                                    </button>
                                                </div>
                                            </div>
                                            <br />
                                            <h6>
                                                We would love to hear from you so don&lsquo;t
                                                hesitate to say hi!
                                            </h6>

                                            <div className="mb-2">
                                                <div className="">+8801970785096</div>
                                                <div>info@chintaarchitects.com</div>
                                            </div>
                                            <p>
                                                CHINTA STHAPATYA, Level-5, House-25/2, Road
                                                No-15 (new) 28 (old)
                                                <br />
                                                Dhaka 1205, Bangladesh
                                            </p>
                                        </div>
                                        <ul className="social-link">
                                            <li>
                                                <a
                                                    href="#"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Twitter
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://www.linkedin.com/in/kanakmahmud/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    LinkedIn
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://www.instagram.com/chintaarchitects/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Instagram
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://www.facebook.com/chintasthapatya"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Facebook
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="gmap_canvas">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                id="gmap_canvas"
                                                src="https://maps.google.com/maps?q=Chinta,%20CHINTA%20STHAPATYA,%20Level-5&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                                frameBorder="0"
                                                scrolling="no"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
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
