import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import Contact from 'src/components/Contact';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Info from 'src/components/Info';
import Preloader from 'src/components/Preloader';
import Projects from 'src/components/Projects';
import Slider from 'src/components/Slider';

const Home: NextPage = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        window.addEventListener('load', () => {
            setShowPreloader(false);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main>
                {showPreloader && <Preloader />}
                <Slider />
                <Element name="projects" className=" section project-section">
                    <Projects />
                </Element>
                <Info />
                <Element name="contact" className="">
                    <Contact />
                </Element>
            </main>
            <Footer />
        </>
    );
};

export default Home;
