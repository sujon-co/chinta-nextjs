import type { NextPage } from 'next';
import Head from 'next/head';
import { Element } from 'react-scroll';
import Contact from 'src/components/Contact';
import Info from 'src/components/Info';
import Layout from 'src/components/Layout';
import Projects from 'src/components/Projects';
import Slider from 'src/components/Slider';

const Home: NextPage = () => {
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
            <Layout>
                <main className="section-wrapper">
                    <Slider />
                    <Element
                        name="projects"
                        className=" section project-section"
                    >
                        <Projects />
                    </Element>
                    <Info />
                    <Element name="contact" className="contact-section">
                        <Contact />
                    </Element>
                </main>
            </Layout>
        </>
    );
};

export default Home;
