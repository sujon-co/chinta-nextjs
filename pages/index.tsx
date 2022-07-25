import { AxiosResponse } from 'axios';
import Header from 'components/Common/Header';
import Contact from 'components/Contact';
import About from 'components/Info/about';
import Studio from 'components/Info/studio';
import ProjectItem from 'components/ProjectItem';
import Slider from 'components/Slider';
import Title from 'components/Title';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
import { IAbout, ISlider } from 'server/interface';
import instance from 'services/httpService';

const Home: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ sliderImages, about }) => {
    return (
        <>
            <Head>
                <title>Chinta</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="section-wrapper">
                <Slider sliderImages={sliderImages} />
                <div className="section ">
                    <Title title="Projects" />
                    <div className="container ">
                        <div className="projects">
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
                    <Title title="About Me" />
                    <div className="container info-section">
                        <div className="info-item-section">
                            <About about={about} />
                        </div>
                        <div className="">
                            <Studio />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <Title title="Contact Me" />
                    <Contact />
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async () => {
    /** Slider Data Handler */
    const { data: sliders } = await instance.get<AxiosResponse<ISlider[]>>(
        '/sliders'
    );

    const sliderImages = await Promise.all(
        sliders.data.map(async (data) => {
            const { base64, img } = await getPlaiceholder(data.photoUrl);
            return {
                ...img,
                base64: base64,
                alt: data.alt,
            };
        })
    );

    const { data: _about } = await instance.get<{ data: IAbout[] }>(
        '/info/about'
    );
    const aboutData = _about.data[0];

    const about = await getPlaiceholder(aboutData.photoUrl).then(
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
            about,
        },
    };
};

export default Home;
